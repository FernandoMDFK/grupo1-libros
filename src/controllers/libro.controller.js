// src/controllers/libro.controller.js

// Importamos el modelo para poder hacer operaciones en la BD
const Libro = require('../models/libro.model');

// ─────────────────────────────────────────────
// GET /api/libros — Listar todos los libros
// ─────────────────────────────────────────────
const listarLibros = async (req, res) => {
  try {
    // findAll() equivale a: SELECT * FROM libros
    const libros = await Libro.findAll();

    // Respondemos con 200 OK y el array de libros en formato JSON
    return res.status(200).json({
      ok: true,
      total: libros.length,
      data: libros,
    });
  } catch (error) {
    // Si algo falla (ej: BD caída), respondemos con 500 Internal Server Error
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los libros',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/libros/:id — Obtener un libro por ID
// ─────────────────────────────────────────────
const obtenerLibroPorId = async (req, res) => {
  try {
    // req.params.id contiene el valor del parámetro en la URL (ej: /api/libros/5 → id = 5)
    const { id } = req.params;

    // findByPk() = find By Primary Key → SELECT * FROM libros WHERE id = ?
    const libro = await Libro.findByPk(id);

    // Si no se encontró el libro, respondemos con 404 Not Found
    if (!libro) {
      return res.status(404).json({
        ok: false,
        mensaje: `No se encontró un libro con ID ${id}`,
      });
    }

    // Si existe, respondemos con 200 OK y los datos del libro
    return res.status(200).json({
      ok: true,
      data: libro,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el libro',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// POST /api/libros — Registrar un nuevo libro
// ─────────────────────────────────────────────
const crearLibro = async (req, res) => {
  try {
    // req.body contiene los datos enviados en el cuerpo de la petición (JSON)
    const { titulo, autor, editorial, anio_publicacion, categoria, disponible } = req.body;

    // Validación manual: campos obligatorios
    if (!titulo || !autor) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Los campos "titulo" y "autor" son obligatorios',
      });
    }

    // create() inserta un nuevo registro en la tabla
    // Sequelize ejecuta: INSERT INTO libros (titulo, autor, ...) VALUES (?, ?, ...)
    const nuevoLibro = await Libro.create({
      titulo,
      autor,
      editorial,
      anio_publicacion,
      categoria,
      // Si no se envía "disponible", por defecto será true (según el modelo)
      disponible: disponible !== undefined ? disponible : true,
    });

    // Respondemos con 201 Created (el recurso fue creado exitosamente)
    return res.status(201).json({
      ok: true,
      mensaje: 'Libro registrado exitosamente',
      data: nuevoLibro,
    });
  } catch (error) {
    // Los errores de validación de Sequelize son del tipo SequelizeValidationError
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error de validación',
        errores: error.errors.map(e => e.message), // lista de mensajes de validación
      });
    }

    return res.status(500).json({
      ok: false,
      mensaje: 'Error al registrar el libro',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// PUT /api/libros/:id — Actualizar un libro
// ─────────────────────────────────────────────
const actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;

    // Primero verificamos si el libro existe
    const libro = await Libro.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        ok: false,
        mensaje: `No se encontró un libro con ID ${id}`,
      });
    }

    // Extraemos solo los campos que vienen en el body
    // (el cliente puede enviar solo los campos que quiere actualizar)
    const { titulo, autor, editorial, anio_publicacion, categoria, disponible } = req.body;

    // update() modifica el registro en la BD
    // Sequelize ejecuta: UPDATE libros SET ... WHERE id = ?
    await libro.update({
      titulo:           titulo           ?? libro.titulo,
      autor:            autor            ?? libro.autor,
      editorial:        editorial        ?? libro.editorial,
      anio_publicacion: anio_publicacion ?? libro.anio_publicacion,
      categoria:        categoria        ?? libro.categoria,
      disponible:       disponible       !== undefined ? disponible : libro.disponible,
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Libro actualizado exitosamente',
      data: libro,
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error de validación',
        errores: error.errors.map(e => e.message),
      });
    }

    return res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el libro',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/libros/:id — Eliminar un libro
// ─────────────────────────────────────────────
const eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificamos existencia antes de eliminar
    const libro = await Libro.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        ok: false,
        mensaje: `No se encontró un libro con ID ${id}`,
      });
    }

    // destroy() elimina el registro de la BD
    // Sequelize ejecuta: DELETE FROM libros WHERE id = ?
    await libro.destroy();

    return res.status(200).json({
      ok: true,
      mensaje: `Libro con ID ${id} eliminado exitosamente`,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el libro',
      error: error.message,
    });
  }
};

// Exportamos todas las funciones para que las rutas puedan usarlas
module.exports = {
  listarLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
};