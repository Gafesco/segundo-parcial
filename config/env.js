

const env = {
    database: 'basedatos_sa43',
    username: 'usuario',
    password: 'bLOjKHVBtDjDk3I1P1nI7pkQjdLJbTas',
    host: 'dpg-cror8jo8fa8c73dkhdcg-a.oregon-postgres.render.com',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;