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

db.sequelize.sync().then(() => {
  console.log('Drop and Resync with { force: true }');
});


let libroRouter = require('./routers/routerlibro.js');


app.use('/api/libros', libroRouter); 


app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
