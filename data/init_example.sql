SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `nombres` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `sexo` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `nombres` (`id`, `nombre`, `sexo`) VALUES
(1, 'Aaron', 'M'),
(2, 'Aaronit', 'M'),
(3, 'Aba', 'F');

ALTER TABLE `nombres`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `nombres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;