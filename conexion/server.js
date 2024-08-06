import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from 'fs';
import dotenv from 'dotenv';


const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "..")));

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "VACUUDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL pool created");
if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_HOST) {
  console.log("Using environment variables for database connection");
}

// ruta por default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/lugares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/appPage/app.html"));
});

// SE USA PARA MOSTRAR MEJORES 10 CAFES
app.get("/lugares/TopCafes", async (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'cafe' 
    order by clicks DESC LIMIT 10 ;
    `;

  try {
    const [results] = await pool.query(SQLLugares);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// SE USA PARA MOSTRAR MEJORES 10 RESTAURANTES
app.get("/lugares/TopRestaurantes", async (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'restaurante' OR c.nombre_categoria = 'restaurante-bar' 
    order by clicks DESC LIMIT 10 ;
    `;

  try {
    const [results] = await pool.query(SQLLugares);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// SE USA PARA MOSTRAR MEJORES 10  BARES
app.get("/lugares/TopBares", async (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'bar'
    order by clicks DESC LIMIT 10 ;
    `;

  try {
    const [results] = await pool.query(SQLLugares);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// SE USA PARA MOSTRAR MEJORES 10 LUGARES CULTURALES
app.get("/lugares/TopCulturales", async (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'cultural' order by clicks 
    DESC LIMIT 10; ;
    `;

  try {
    const [results] = await pool.query(SQLLugares);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Ruta para mostrar la pagina cafes
app.get("/lugares/cafes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Cafes.html"));
});

// ruta para mostrar un cafe por su nombre
app.get("/api/lugares/cafes", async (req, res) => {
  const nombreLugar = req.query.nombre;

  if (!nombreLugar) {
    return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
  }

  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.nombre_lugar = ?;`;

  try {
    const [results] = await pool.query(sql, [nombreLugar]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Ruta para mostrar la pagina restaurantes
app.get("/lugares/restaurantes", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "establecimientos/Restaurantes.html")
  );
});

// ruta para mostrar restaurantes por su nombre
app.get("/api/lugares/restaurantes", async (req, res) => {
  const nombreLugar = req.query.nombre;

  if (!nombreLugar) {
    return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
  }

  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.nombre_lugar = ?;`;
  try {
    const [results] = await pool.query(sql, [nombreLugar]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Ruta para mostrar la pagina bares
app.get("/lugares/bares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Bares.html"));
});

// ruta para mostrar bares por su nombre
app.get("/api/lugares/bares", async (req, res) => {
  const nombreLugar = req.query.nombre;

  if (!nombreLugar) {
    return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
  }

  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.nombre_lugar = ?;`;
  try {
    const [results] = await pool.query(sql, [nombreLugar]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Ruta para mostrar la pagina culturales
app.get("/lugares/cultural", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Cultural.html"));
});

// ruta para mostrar bares por su nombre
app.get("/api/lugares/cultural", async (req, res) => {
  const nombreLugar = req.query.nombre;

  if (!nombreLugar) {
    return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
  }

  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.nombre_lugar = ?;`;
  try {
    const [results] = await pool.query(sql, [nombreLugar]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

//Este get muestra las imagenes extra de un lugar por id
app.get("/lugares/imagenes", async (req, res) => {
  const id_lugar = req.query.id_lugar;
  const sql = `SELECT * FROM imagenes_lugares WHERE fk_lugar = ${id_lugar};`;
  try {
    const [results] = await pool.query(sql);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Este get es para lugares similares que no sean restaurantes
app.get("/lugares/similares", async (req, res) => {
  const nombreLugar = req.query.nombre;
  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
        FROM lugares l
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.fk_categoria = (select fk_categoria from lugares where nombre_lugar = '${nombreLugar}') and l.nombre_lugar != '${nombreLugar}'
        and (l.fk_ambiente = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}')
        OR l.fk_ambiente2 = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}'))
        order by clicks DESC LIMIT 10;`;
  try {
    const [results] = await pool.query(sql);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Este get es para lugares similares que sean restaurantes y bares
app.get("/lugares/similares-restaurantes-bar", async(req, res) => {
  const nombreLugar = req.query.nombre;
  const sql = `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
        FROM lugares l
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE (l.fk_categoria = (select fk_categoria from lugares where nombre_lugar = '${nombreLugar}')or c.nombre_categoria = 'restaurante-bar') and l.nombre_lugar != '${nombreLugar}'
        and (l.fk_ambiente = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}')
        OR l.fk_ambiente2 = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}'))
        order by clicks DESC LIMIT 10;`;
  try {
    const [results] = await pool.query(sql);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// POST PARA FILTRAR LUGARES
app.post("/lugares-filtrados", async (req, res) => {
  const { categoria, ambiente, precio } = req.body;
  const categoriaLugar = categoria;
  const ambienteLugar = ambiente;
  const precioLugar = precio;
  var sql = "";

  if ((categoriaLugar != "Cafe" && categoriaLugar != "Restaurante" && categoriaLugar != "Bar" && categoriaLugar != "Cultural") || (ambienteLugar != "Chill" && ambienteLugar != "Familiar" && ambienteLugar != "Amigos" && ambienteLugar != "Pareja") || (precioLugar != "1" && precioLugar != "2" && precioLugar != "3" && precioLugar != "4")) {
    if ((ambienteLugar != "Chill" && ambienteLugar != "Familiar" && ambienteLugar != "Amigos" && ambienteLugar != "Pareja") && (precioLugar != "1" && precioLugar != "2" && precioLugar != "3" && precioLugar != "4")) {
      if (categoriaLugar == "Restaurante") {
        sql = `
              SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
              from lugares l 
              JOIN categorias c ON l.fk_categoria = c.id_categoria
              JOIN ambientes a ON l.fk_ambiente = id_ambiente
              JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
              WHERE c.nombre_categoria = '${categoriaLugar}' or c.nombre_categoria = 'restaurante-bar'
              order by l.clicks DESC;
                `;
      } else {
        sql = `
                SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                FROM lugares l 
                JOIN categorias c ON l.fk_categoria = c.id_categoria
                JOIN ambientes a ON l.fk_ambiente = id_ambiente
                JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                WHERE c.nombre_categoria = '${categoriaLugar}'
                order by clicks DESC;
                `;
      }
    } else {
      if ((categoriaLugar != "Cafe" && categoriaLugar != "Restaurante" && categoriaLugar != "Bar" && categoriaLugar != "Cultural") && (precioLugar != "1" && precioLugar != "2" && precioLugar != "3" && precioLugar != "4")) {
        sql = `
                SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                FROM lugares l 
                JOIN categorias c ON l.fk_categoria = c.id_categoria
                JOIN ambientes a ON l.fk_ambiente = id_ambiente
                JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                WHERE (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}')
                order by clicks DESC;
                `;
      } else {
        if ((categoriaLugar != "Cafe" && categoriaLugar != "Restaurante" && categoriaLugar != "Bar" && categoriaLugar != "Cultural") && (ambienteLugar != "Chill" && ambienteLugar != "Familiar" && ambienteLugar != "Amigos" && ambienteLugar != "Pareja")) {
          sql = `
                    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                    FROM lugares l 
                    JOIN categorias c ON l.fk_categoria = c.id_categoria
                    JOIN ambientes a ON l.fk_ambiente = id_ambiente
                    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                    WHERE l.precio = '${precioLugar}'
                    order by clicks DESC;
                    `;
        } else {
          if ((categoriaLugar != "Cafe" && categoriaLugar != "Restaurante" && categoriaLugar != "Bar" && categoriaLugar != "Cultural")) {
            sql = `
                        SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                        FROM lugares l 
                        JOIN categorias c ON l.fk_categoria = c.id_categoria
                        JOIN ambientes a ON l.fk_ambiente = id_ambiente
                        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                        WHERE (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}') 
                        AND l.precio = '${precioLugar}'
                        order by clicks DESC;
                        `;
          } else {
            if ((ambienteLugar != "Chill" && ambienteLugar != "Familiar" && ambienteLugar != "Amigos" && ambienteLugar != "Pareja")) {
              if (categoriaLugar == "Restaurante") {
                sql = `
                                SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                                FROM lugares l 
                                JOIN categorias c ON l.fk_categoria = c.id_categoria
                                JOIN ambientes a ON l.fk_ambiente = id_ambiente
                                JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                                WHERE (c.nombre_categoria = '${categoriaLugar}' or c.nombre_categoria ='restaurante-bar') AND l.precio = '${precioLugar}' 
                                order by clicks DESC;
                                `;
              } else {
                sql = `
                                SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                                FROM lugares l 
                                JOIN categorias c ON l.fk_categoria = c.id_categoria
                                JOIN ambientes a ON l.fk_ambiente = id_ambiente
                                JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                                WHERE c.nombre_categoria = '${categoriaLugar}' AND l.precio = '${precioLugar}' 
                                order by clicks DESC;
                                `;
              }
            } else {
              if ((precioLugar != "1" && precioLugar != "2" && precioLugar != "3" && precioLugar != "4")) {
                if (categoriaLugar == "Restaurante") {
                  sql = `
                                    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                                    FROM lugares l 
                                    JOIN categorias c ON l.fk_categoria = c.id_categoria
                                    JOIN ambientes a ON l.fk_ambiente = id_ambiente
                                    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                                    WHERE (c.nombre_categoria = '${categoriaLugar}' or c.nombre_categoria ='restaurante-bar') AND (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}')
                                    order by clicks DESC;
                                    `;
                } else {
                  sql = `
                                    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                                    FROM lugares l 
                                    JOIN categorias c ON l.fk_categoria = c.id_categoria
                                    JOIN ambientes a ON l.fk_ambiente = id_ambiente
                                    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                                    WHERE c.nombre_categoria = '${categoriaLugar}' AND (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}')
                                    order by clicks DESC;
                                    `;
                }
              }
            }
          }
        }
      }
    }
  } else {
    if (categoriaLugar == "Restaurante") {
      sql = `
            SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
            FROM lugares l 
            JOIN categorias c ON l.fk_categoria = c.id_categoria
            JOIN ambientes a ON l.fk_ambiente = id_ambiente
            JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
            WHERE (c.nombre_categoria = '${categoriaLugar}' or c.nombre_categoria = 'restaurante-bar') AND (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}') 
            AND l.precio = '${precioLugar}'
            order by clicks DESC;
            `;
    } else {
      sql = `
            SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
            FROM lugares l 
            JOIN categorias c ON l.fk_categoria = c.id_categoria
            JOIN ambientes a ON l.fk_ambiente = id_ambiente
            JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
            WHERE c.nombre_categoria = '${categoriaLugar}' AND (a.ambiente = '${ambienteLugar}' or (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) = '${ambienteLugar}') 
            AND l.precio = '${precioLugar}'
            order by clicks DESC;
            `;
    }
  }
  try {
    const [results] = await pool.query(sql);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});

// Ir a pagina donde se muestran los lugares filtrados
app.get("/lugares/resultado-filtro", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "filtrosPage/resultados.html"));
});

// POST PARA AÑADIR CLICKS A LOS LUGARES AL SER PULSADOS
app.post("/incrementar-clicks", async(req, res) => {
  const { lugarId } = req.body;

  if (!lugarId) {
    return res.status(400).json({ error: "Se requiere el ID del lugar" });
  }

  const sql = "UPDATE lugares SET clicks = clicks + 1 WHERE id_lugar = ?";

  try {
    const [results] = await pool.query(sql, [lugarId]);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }
});


app.get("/traducir", (req, res) => {
  const jsonFilePath = path.join(__dirname, '..', 'translation/indexTrans.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading the file' });
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error(parseErr);
      res.status(500).json({ error: 'Error parsing JSON' });
    }
  });
});


// ver todas las cafeterias existentes
app.get("/lugares/todo-cafeterias", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "categorias/todo_cafeterias.html"));
});

// ver todos los restaurnates existentes
app.get("/lugares/todo-restaurantes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "categorias/todo_restaurantes.html"));
});

// ver todos los bares existentes
app.get("/lugares/todo-bares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "categorias/todo_bares.html"));
});

// ver todos los bares existentes
app.get("/lugares/todo-cultural", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "categorias/todo_cultural.html"));
});

app.get("/lugares/todo", async (req, res) => {
  const categoria = req.query.categoria;
  var sql = "";
  if (categoria == 'restaurante') {
    sql = `
      SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE c.nombre_categoria = '${categoria}' or c.nombre_categoria = 'restaurante-bar'
        order by l.clicks DESC;
      `;
  } else {
    sql = `
      SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE c.nombre_categoria = '${categoria}'
        order by l.clicks DESC;
      `;
  }
  try {
    const [results] = await pool.query(sql);
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  } catch (err) {
    console.error("Error en la consulta de la base de datos:", err);
    res.status(500).json({ error: "Error en la consulta de la base de datos" });
  }

});

// ver todos los bares existentes
app.get("/nosotros", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "aboutUsPage/aboutUs.html"));
});

//RUTA MISION
app.get("/mision", (req, res) => {
  res.redirect('/aboutUsPage/aboutUs.html#mision');
});

app.get("/funciones", (req, res) => {
  res.redirect('/index.html#funciones');
});

app.get("/preguntas-frecuentes", (req, res) => {
  res.redirect('/Paginasextra/PF.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
