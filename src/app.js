// src/app.js — Punto de entrada del servidor

// Cargamos las variables de entorno PRIMERO (antes de cualquier otra importación)
require('dotenv').config();

const express = require('express');
const cors    = require('cors');

// Importamos la conexión a la BD y el modelo (para la sincronización)
const sequelize = require('./config/database');
const Libro     = require('./models/libro.model');

// Importamos las rutas de libros
const libroRoutes = require('./routes/libro.routes');

// ── Crear la aplicación Express ────────────────────────────────────────────
const app = express();

// ── Middlewares globales ───────────────────────────────────────────────────
// Un middleware es una función que se ejecuta ANTES de llegar a la ruta

// cors(): permite peticiones desde cualquier origen (frontend, Postman, etc.)
app.use(cors());

// express.json(): parsea el body de las peticiones con formato JSON
// Sin esto, req.body estaría vacío en POST y PUT
app.use(express.json());

// ── Registrar rutas ────────────────────────────────────────────────────────
// Todas las rutas de libro.routes.js estarán bajo el prefijo /api/libros
app.use('/api/libros', libroRoutes);

// ── Ruta de bienvenida (para verificar que el servidor está vivo) ──────────
app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 API Gestión de Libros Académicos — Grupo 1',
    version: '1.0.0',
    endpoints: {
      listar:     'GET    /api/libros',
      obtener:    'GET    /api/libros/:id',
      crear:      'POST   /api/libros',
      actualizar: 'PUT    /api/libros/:id',
      eliminar:   'DELETE /api/libros/:id',
    }
  });
});

// ── Manejo de rutas no encontradas (404) ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: `La ruta ${req.method} ${req.url} no existe en esta API`,
  });
});

// ── Arrancar el servidor ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// Primero sincronizamos la BD con Sequelize, luego levantamos el servidor
// sync({ alter: true }) actualiza la tabla si el modelo cambió (no destruye datos)
// sync({ force: true }) BORRA y recrea la tabla (¡cuidado! solo para desarrollo)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
    console.log('✅ Tabla "libros" sincronizada');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 API disponible en http://localhost:${PORT}/api/libros`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1); // Detenemos el proceso si no hay conexión a BD
  });