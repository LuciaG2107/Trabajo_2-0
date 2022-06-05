-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2022 a las 01:25:51
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `maptos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

CREATE TABLE `foto` (
  `nomFoto` varchar(20) NOT NULL,
  `tamFoto` mediumblob NOT NULL,
  `nomMarca_marcador` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcador`
--

CREATE TABLE `marcador` (
  `nomMarca` varchar(50) NOT NULL,
  `correoUsuario_usuario` varchar(50) NOT NULL,
  `longitud` float(10,8) NOT NULL,
  `latitud` float(10,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marcador`
--

INSERT INTO `marcador` (`nomMarca`, `correoUsuario_usuario`, `longitud`, `latitud`) VALUES
('Alconcon', 'lucia21797@gmail.com', 40.29925156, -3.84445310),
('Leganes', 'lucia21797@gmail.com', 40.32811737, -3.78370881);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `correoUsuario` varchar(50) NOT NULL,
  `contrasenna` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`correoUsuario`, `contrasenna`) VALUES
('hola@corre.es', 'es'),
('lucia21797@gmail.com', 'dd'),
('lucia@gmail.com', 'lucia'),
('luu@correo.es', 'ese'),
('pepa@gmail.es', 'ddd');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`nomFoto`),
  ADD KEY `nomMarca_marcador` (`nomMarca_marcador`);

--
-- Indices de la tabla `marcador`
--
ALTER TABLE `marcador`
  ADD PRIMARY KEY (`nomMarca`),
  ADD KEY `correoUsuario_usuario` (`correoUsuario_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correoUsuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`nomMarca_marcador`) REFERENCES `marcador` (`nomMarca`);

--
-- Filtros para la tabla `marcador`
--
ALTER TABLE `marcador`
  ADD CONSTRAINT `marcador_ibfk_1` FOREIGN KEY (`correoUsuario_usuario`) REFERENCES `usuario` (`correoUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
