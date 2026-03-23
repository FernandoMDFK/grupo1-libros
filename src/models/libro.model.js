// src/models/libro.model.js

// Importamos DataTypes para definir los tipos de cada campo
const { DataTypes } = require('sequelize');

// Importamos la conexión configurada en el paso anterior
const sequelize = require('../config/database');

// Definimos el modelo "Libro"
// Sequelize creará (o usará) una tabla llamada "libros" en la BD
const Libro = sequelize.define('Libro', {

  // Campo ID: clave primaria, se incrementa automáticamente
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Título del libro: texto obligatorio
  titulo: {
    type: DataTypes.STRING(255), // VARCHAR(255) en SQL
    allowNull: false,            // no puede estar vacío
    validate: {
      notEmpty: { msg: 'El título no puede estar vacío' },
    },
  },

  // Autor: texto obligatorio
  autor: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El autor no puede estar vacío' },
    },
  },

  // Editorial: texto opcional
  editorial: {
    type: DataTypes.STRING(150),
    allowNull: true, // puede venir vacío
  },

  // Año de publicación: número entero
  anio_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: { msg: 'El año de publicación debe ser un número entero' },
      min: { args: [1000], msg: 'El año debe ser mayor a 1000' },
      max: { args: [new Date().getFullYear()], msg: 'El año no puede ser futuro' },
    },
  },

  // Categoría: texto libre (ej: "Ciencias", "Humanidades")
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // Disponible: booleano (true = disponible para préstamo, false = prestado)
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // por defecto, un libro recién registrado está disponible
  },

}, {
  // Opciones del modelo
  tableName: 'libros',   // nombre exacto de la tabla en la BD
  timestamps: true,      // Sequelize agrega automáticamente createdAt y updatedAt
});

// Exportamos el modelo para usarlo en el controlador
module.exports = Libro;