import express from 'express';
import mysql from 'mysql';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '..')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'VACUUDB'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MYSQL database');
});

// ruta por default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/lugares', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/appPage/app.html'));
});


// SE USA PARA MOSTRAR MEJORES 10 CAFES
app.get('/lugares/TopCafes', (req, res) => {

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
            return res.status(500).json({ error: 'error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });

});

// SE USA PARA MOSTRAR MEJORES 10 RESTAURANTES
app.get('/lugares/TopRestaurantes', (req, res) => {

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
            return res.status(500).json({ error: 'error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });

});


// SE USA PARA MOSTRAR MEJORES 10  BARES
app.get('/lugares/TopBares', (req, res) => {

    const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'bar' OR c.nombre_categoria = 'restaurante-bar' 
    order by clicks DESC LIMIT 10 ;
    `;

    db.query(SQLLugares, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });
});


// SE USA PARA MOSTRAR MEJORES 10 LUGARES CULTURALES
app.get('/lugares/TopCulturales', (req, res) => {

    const SQLLugares = `
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
    FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'culturales' order by clicks 
    DESC LIMIT 10; ;
    `;

    db.query(SQLLugares, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });
});


// Ruta para mostrar la pagina en lugar
app.get('/lugares/cafes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'establecimientos/establecimientos.html'));
});

// ruta para mostrar un lugar por id
app.get('/api/lugares/cafes', (req, res) => {
    const nombreLugar = req.query.nombre;

    if (!nombreLugar) {
        return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
    }

    const sql =
        `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
        from lugares l 
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.nombre_lugar = ?;`
        ;

    db.query(sql, [nombreLugar], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });

});


app.get('/lugares/similares', (req, res) => {
    const nombreLugar = req.query.nombre;
    const sql =
        `SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
        FROM lugares l
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE l.fk_categoria = (select fk_categoria from lugares where nombre_lugar = '${nombreLugar}') and l.nombre_lugar != '${nombreLugar}'
        and (l.fk_ambiente = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}')
        OR l.fk_ambiente2 = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = '${nombreLugar}'))
        order by clicks DESC LIMIT 10;`
        ;

        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
            }
            res.json(results);
        });

});








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

