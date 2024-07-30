import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from 'fs';


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

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "VACUUDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MYSQL database");
});

// ruta por default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/lugares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/appPage/app.html"));
});

// SE USA PARA MOSTRAR MEJORES 10 CAFES
app.get("/lugares/TopCafes", (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'cafe' 
    order by clicks DESC LIMIT 10 ;
    `;

  db.query(SQLLugares, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error en la consulta de la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// SE USA PARA MOSTRAR MEJORES 10 RESTAURANTES
app.get("/lugares/TopRestaurantes", (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'restaurante' OR c.nombre_categoria = 'restaurante-bar' 
    order by clicks DESC LIMIT 10 ;
    `;

  db.query(SQLLugares, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error en la consulta de la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// SE USA PARA MOSTRAR MEJORES 10  BARES
app.get("/lugares/TopBares", (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'bar'
    order by clicks DESC LIMIT 10 ;
    `;

  db.query(SQLLugares, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error en la consulta de la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// SE USA PARA MOSTRAR MEJORES 10 LUGARES CULTURALES
app.get("/lugares/TopCulturales", (req, res) => {
  const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'cultural' order by clicks 
    DESC LIMIT 10; ;
    `;

  db.query(SQLLugares, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error en la consulta de la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Ruta para mostrar la pagina cafes
app.get("/lugares/cafes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Cafes.html"));
});

// ruta para mostrar un cafe por su nombre
app.get("/api/lugares/cafes", (req, res) => {
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
  db.query(sql, [nombreLugar], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Ruta para mostrar la pagina restaurantes
app.get("/lugares/restaurantes", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "establecimientos/Restaurantes.html")
  );
});

// ruta para mostrar restaurantes por su nombre
app.get("/api/lugares/restaurantes", (req, res) => {
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
  db.query(sql, [nombreLugar], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Ruta para mostrar la pagina bares
app.get("/lugares/bares", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Bares.html"));
});

// ruta para mostrar bares por su nombre
app.get("/api/lugares/bares", (req, res) => {
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
  db.query(sql, [nombreLugar], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Ruta para mostrar la pagina culturales
app.get("/lugares/cultural", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "establecimientos/Cultural.html"));
});

// ruta para mostrar bares por su nombre
app.get("/api/lugares/cultural", (req, res) => {
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
  db.query(sql, [nombreLugar], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

//Este get muestra las imagenes extra de un lugar por id
app.get("/lugares/imagenes", (req, res) => {
  const id_lugar = req.query.id_lugar;
  const sql = `SELECT * FROM imagenes_lugares WHERE fk_lugar = ${id_lugar};`;
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Este get es para lugares similares que no sean restaurantes
app.get("/lugares/similares", (req, res) => {
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
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// Este get es para lugares similares que sean restaurantes y bares
app.get("/lugares/similares-restaurantes-bar", (req, res) => {
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
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró ningún lugar con ese nombre" });
    }
    res.json(results);
  });
});

// POST PARA FILTRAR LUGARES
app.post("/lugares-filtrados", (req, res) => {
  const { categoria, ambiente, precio } = req.body;
  const categoriaLugar = categoria;
  const ambienteLugar = ambiente;
  const precioLugar = precio;
  var sql = "";

  if (!categoriaLugar || !ambienteLugar || !precioLugar) {
    if (!ambienteLugar && !precioLugar) {
      if (categoriaLugar == "restaurante" || categoriaLugar == "bar") {
        sql = `
                SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
                FROM lugares l 
                JOIN categorias c ON l.fk_categoria = c.id_categoria
                JOIN ambientes a ON l.fk_ambiente = id_ambiente
                JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
                WHERE c.nombre_categoria = '${categoriaLugar} or c.nombre_categoria = 'restaurante-bar'
                order by clicks DESC;
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
      if (!categoriaLugar && !precioLugar) {
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
        if (!categoriaLugar && !ambienteLugar) {
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
          if (!categoriaLugar) {
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
            if (!ambienteLugar) {
              if (categoriaLugar == "restaurante" || categoriaLugar == "bar") {
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
              if (!precioLugar) {
                if (
                  categoriaLugar == "restaurante" ||
                  categoriaLugar == "bar"
                ) {
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
    if (categoriaLugar == "restaurante" || categoriaLugar == "bar") {
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
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta de la base de datos" });
    } else {
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró ningún lugar con esos filtros" });
      } else {
        res.json(results);
      }
    }
  });
});

// POST PARA AÑADIR CLICKS A LOS LUGARES AL SER PULSADOS
app.post("/incrementar-clicks", (req, res) => {
  const { lugarId } = req.body;

  if (!lugarId) {
    return res.status(400).json({ error: "Se requiere el ID del lugar" });
  }

  const sql = "UPDATE lugares SET clicks = clicks + 1 WHERE id_lugar = ?";

  db.query(sql, [lugarId], (err, result) => {
    if (err) {
      console.error("Error al incrementar clicks:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json({ message: "Clicks incrementados correctamente" });
  });
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
