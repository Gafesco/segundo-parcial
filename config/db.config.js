const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
const LibroModel = require('../models/libros.model.js');
const EstudianteModel = require('../models/estudiante.model.js');
const CursoModel = require('../models/curso.model.js');
const NotaModel = require('../models/nota.model.js'); // Añadido para el modelo Nota

db.Libro = LibroModel(sequelize, Sequelize);
db.Estudiante = EstudianteModel(sequelize, Sequelize);
db.Curso = CursoModel(sequelize, Sequelize);
db.Nota = NotaModel(sequelize, Sequelize); // Añadido para el modelo Nota

module.exports = db;
