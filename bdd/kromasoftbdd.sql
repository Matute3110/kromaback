-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2026 a las 02:45:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kromasoftbdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `barbero_id` int(11) NOT NULL,
  `servicio_id` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `estado` enum('pendiente','confirmada','completada','cancelada') DEFAULT 'pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `cargo`, `estado`) VALUES
(1, 'carlos \r\n', 'Barber', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `duracion_minutos` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `precio`, `duracion_minutos`, `activo`, `estado`) VALUES
(1, 'ghfhjkfhjgf', NULL, 0.45, 0, 1, 1),
(2, 'Corte Clásico', NULL, 5.00, 0, 1, 1),
(3, 'Degradado ', NULL, 7.00, 0, 1, 1),
(4, 'Corte de Niño', NULL, 5.00, 0, 1, 1),
(5, 'Corte con Tijera (Largo)', NULL, 10.00, 0, 1, 1),
(6, 'Corte Militar / Rapado', NULL, 4.00, 0, 1, 1),
(7, 'Perfilado de Barba', NULL, 4.00, 0, 1, 1),
(8, 'Afeitado Tradicional (Navaja y Toalla Caliente)', NULL, 6.00, 0, 1, 1),
(9, 'Pigmentación de Barba', NULL, 5.00, 0, 1, 1),
(10, 'Corte VIP (Cabello + Barba + Cejas)', NULL, 15.00, 0, 1, 1),
(11, 'Diseño / Freestyle (Líneas simples)', NULL, 3.00, 0, 1, 1),
(12, 'Diseño / Freestyle (Complejo)', NULL, 8.00, 0, 1, 1),
(13, 'Lavado de Cabello', NULL, 2.00, 0, 1, 1),
(14, 'Tratamiento Capilar / Hidratación', NULL, 12.00, 0, 1, 1),
(15, 'Tinte de Cabello (Color base)', NULL, 15.00, 0, 1, 1),
(16, 'Decoloración / Platinado', NULL, 25.00, 0, 1, 1),
(17, 'Rayitos / Iluminaciones', NULL, 20.00, 0, 1, 1),
(18, 'Alisado / Keratina (Cabello Corto)', NULL, 30.00, 0, 1, 1),
(19, 'Limpieza Facial Express', NULL, 8.00, 0, 1, 1),
(20, 'Mascarilla Puntos Negros (Black Mask)', NULL, 5.00, 0, 1, 1),
(21, 'Exfoliación Facial Profunda', NULL, 12.00, 0, 1, 1),
(22, 'Depilación de Cejas con Navaja', NULL, 3.00, 0, 1, 1),
(23, 'Depilación de Cejas con Hilo o Cera', NULL, 5.00, 0, 1, 1),
(24, 'Peinado / Styling con Pomada', NULL, 4.00, 0, 1, 1),
(25, 'Corte Tercera Edad / Jubilados', NULL, 4.00, 0, 1, 1),
(26, 'Limpieza de Oídos (Conos de Cera)', NULL, 8.00, 0, 1, 1),
(27, 'Combo Gold (Corte + Barba + Facial + Bebida)', NULL, 25.00, 0, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('cliente','barbero','admin') DEFAULT 'cliente',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `rol`, `fecha_registro`, `estado`) VALUES
(8, 'Juan andres', 'Matute rondon', 'Juanmatute3110210@gmail.com', '$2b$10$WVV98K7.MOuToEUoK2RZLeCaiqm/ZftBYwF28pKdVMX9kFPAlyO9i', '+584246302160', '', '2026-10-07 14:34:55', 1),
(9, 'jose', 'carlos', 'j@gmail.com', '$2b$10$p4Scpw2f03sTaad4Aoka5.KGQG3C9SMr45a5fpu2XWJbPmBTqLnva', '04246302160', 'cliente', '2026-10-07 15:36:20', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `barbero_id` (`barbero_id`),
  ADD KEY `servicio_id` (`servicio_id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`barbero_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
