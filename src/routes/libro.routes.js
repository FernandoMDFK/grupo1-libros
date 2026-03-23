// src/routes/libro.routes.js

// Router es un mini-servidor de Express que agrupa rutas relacionadas
const { Router } = require('express');
const router = Router();

// Importamos las funciones del controlador
const {
  listarLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} = require('../controllers/libro.controller');

// ─── Definición de endpoints ───────────────────────────────────────────────
//
//  Método  │ URL               │ Acción
// ─────────┼───────────────────┼──────────────────────────────
//  GET     │ /api/libros       │ Listar todos los libros
//  GET     │ /api/libros/:id   │ Obtener un libro específico
//  POST    │ /api/libros       │ Crear un nuevo libro
//  PUT     │ /api/libros/:id   │ Actualizar un libro existente
//  DELETE  │ /api/libros/:id   │ Eliminar un libro
// ──────────────────────────────────────────────────────────────────────────

router.get('/',     listarLibros);         // GET    /api/libros
router.get('/:id',  obtenerLibroPorId);    // GET    /api/libros/:id
router.post('/',    crearLibro);           // POST   /api/libros
router.put('/:id',  actualizarLibro);      // PUT    /api/libros/:id
router.delete('/:id', eliminarLibro);      // DELETE /api/libros/:id

// Exportamos el router para registrarlo en app.js
module.exports = router;