-- Script para crear la tabla libros en MySQL
-- Base de datos: daw_grupo1 | Servidor: grupofmo.com

CREATE TABLE IF NOT EXISTS libros (
  id               INT          NOT NULL AUTO_INCREMENT,
  titulo           VARCHAR(255) NOT NULL,
  autor            VARCHAR(150) NOT NULL,
  editorial        VARCHAR(150) DEFAULT NULL,
  anio_publicacion INT          DEFAULT NULL,
  categoria        VARCHAR(100) DEFAULT NULL,
  disponible       TINYINT(1)   NOT NULL DEFAULT 1,
  createdAt        DATETIME     NOT NULL,
  updatedAt        DATETIME     NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;