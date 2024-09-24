const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const db = require('./config/db.config.js');

// Sincronización de la base de datos
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada.');
});

// Routers
let libroRouter = require('./routers/routerlibro.js');
let estudianteRouter = require('./routers/routerestudiante.js');
let cursoRouter = require('./routers/routercurso.js'); // Añadido para cursos
let notaRouter = require('./routers/routernota.js'); // Añadido para notas

// Rutas
app.use('/api/libros', libroRouter);
app.use('/api/estudiantes', estudianteRouter);
app.use('/api/cursos', cursoRouter); // Añadido para cursos
app.use('/api/notas', notaRouter); // Añadido para notas

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Servidor
const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
