// src/config/database.js

// Importamos Sequelize y la clase que representa la conexión
const { Sequelize } = require('sequelize');

// Cargamos las variables del archivo .env
require('dotenv').config();

// Creamos una instancia de Sequelize con los datos de conexión
// Sequelize necesita: nombre de BD, usuario, contraseña, y opciones adicionales
const sequelize = new Sequelize(
  process.env.DB_NAME,     // nombre de la base de datos
  process.env.DB_USER,     // usuario de MySQL
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST,   // servidor donde está MySQL
    port: process.env.DB_PORT,   // puerto (3306 por defecto en MySQL)
    dialect: 'mysql',            // le decimos a Sequelize que usamos MySQL (no PostgreSQL, SQLite, etc.)
    logging: false,              // desactivamos los logs de SQL en consola (ponlo en true si quieres ver las queries)
  }
);

// Exportamos la conexión para usarla en otros archivos
module.exports = sequelize;