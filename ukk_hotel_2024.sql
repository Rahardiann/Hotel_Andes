-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 05:07 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk_hotel_2024`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `nik` varchar(255) DEFAULT NULL,
  `nama_customer` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_customer`, `nik`, `nama_customer`, `alamat`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, '222222', 'rahardain eka yudistira', 'modangan', 'rahardian20@gmail.com', '626a91423621c8979dfd8b7da9f1c935', '2023-05-25 13:34:52', '2023-05-25 13:34:52'),
(2, '111111', 'rahardian', 'sukun', 'yt@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-26 00:40:10', '2023-05-26 00:40:10'),
(3, '66666', 'jepi', 'ontoseno', 'yt005881@gmail.com', '626a91423621c8979dfd8b7da9f1c935', '2023-07-25 04:37:04', '2023-07-25 04:37:04'),
(4, '444444', 'Supra', 'sukun', 'supraganteng@gmail.com', '25d55ad283aa400af464c76d713c07ad', '2023-10-10 07:48:29', '2023-10-10 07:48:29');

-- --------------------------------------------------------

--
-- Table structure for table `detail_pemesanan`
--

CREATE TABLE `detail_pemesanan` (
  `id_detail_pemesanan` int(11) NOT NULL,
  `id_pemesanan` int(11) DEFAULT NULL,
  `id_kamar` int(11) DEFAULT NULL,
  `tanggal_akses` datetime DEFAULT NULL,
  `total_harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_pemesanan`
--

INSERT INTO `detail_pemesanan` (`id_detail_pemesanan`, `id_pemesanan`, `id_kamar`, `tanggal_akses`, `total_harga`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, NULL, 2147483647, '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(2, 1, 1, NULL, 2147483647, '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(3, 1, 1, NULL, 2147483647, '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(4, 1, 1, NULL, 2147483647, '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(5, 1, 1, NULL, 2147483647, '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(6, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(7, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(8, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(9, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(10, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(11, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(12, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(13, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(14, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(15, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(16, 3, 3, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(17, 3, 8, NULL, 2000000, '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(18, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(19, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(20, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(21, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(22, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(23, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(24, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(25, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(26, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(27, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(28, 4, 1, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(29, 4, 6, NULL, 2147483647, '2023-07-25 06:06:49', '2023-10-10 07:55:48'),
(30, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(31, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(32, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(33, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(34, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(35, 5, 2, NULL, 23123123, '2023-07-25 06:42:00', '2023-07-25 06:43:59'),
(36, 6, 3, '2023-07-25 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(37, 6, 8, '2023-07-25 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(38, 6, 3, '2023-07-26 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(39, 6, 8, '2023-07-26 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(40, 6, 3, '2023-07-27 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(41, 6, 8, '2023-07-27 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(42, 6, 3, '2023-07-28 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(43, 6, 8, '2023-07-28 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(44, 6, 3, '2023-07-29 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(45, 6, 8, '2023-07-29 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(46, 6, 3, '2023-07-30 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(47, 6, 8, '2023-07-30 00:00:00', 2000000, '2023-07-25 06:48:32', '2023-07-25 06:48:32'),
(48, 7, 1, '2023-10-11 00:00:00', 2147483647, '2023-10-11 03:07:16', '2023-10-11 03:07:16'),
(49, 7, 6, '2023-10-11 00:00:00', 2147483647, '2023-10-11 03:07:16', '2023-10-11 03:07:16'),
(50, 7, 1, '2023-10-12 00:00:00', 2147483647, '2023-10-11 03:07:16', '2023-10-11 03:07:16'),
(51, 7, 6, '2023-10-12 00:00:00', 2147483647, '2023-10-11 03:07:16', '2023-10-11 03:07:16'),
(52, 8, 1, '2023-10-19 00:00:00', 2147483647, '2023-10-11 03:22:39', '2023-10-11 03:22:39'),
(53, 8, 6, '2023-10-19 00:00:00', 2147483647, '2023-10-11 03:22:39', '2023-10-11 03:22:39'),
(54, 8, 1, '2023-10-20 00:00:00', 2147483647, '2023-10-11 03:22:39', '2023-10-11 03:22:39'),
(55, 8, 6, '2023-10-20 00:00:00', 2147483647, '2023-10-11 03:22:39', '2023-10-11 03:22:39'),
(56, 9, 2, '2023-10-11 00:00:00', 23123123, '2023-10-11 07:41:04', '2023-10-11 07:41:04'),
(57, 9, 7, '2023-10-11 00:00:00', 23123123, '2023-10-11 07:41:04', '2023-10-11 07:41:04'),
(58, 9, 2, '2023-10-12 00:00:00', 23123123, '2023-10-11 07:41:04', '2023-10-11 07:41:04'),
(59, 9, 7, '2023-10-12 00:00:00', 23123123, '2023-10-11 07:41:04', '2023-10-11 07:41:04'),
(60, 10, 3, NULL, 2000000, '2023-10-11 08:00:06', '2023-10-11 08:00:59'),
(61, 10, 3, NULL, 2000000, '2023-10-11 08:00:06', '2023-10-11 08:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `kamar`
--

CREATE TABLE `kamar` (
  `id_kamar` int(11) NOT NULL,
  `nomor_kamar` int(11) NOT NULL,
  `id_tipe_kamar` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kamar`
--

INSERT INTO `kamar` (`id_kamar`, `nomor_kamar`, `id_tipe_kamar`, `createdAt`, `updatedAt`) VALUES
(1, 19, 2, '2023-05-25 13:29:28', '2023-10-11 07:42:12'),
(2, 2, 2, '2023-05-25 13:30:03', '2023-05-25 13:30:03'),
(3, 1, 3, '2023-07-25 04:46:23', '2023-07-25 04:46:23'),
(6, 23, 1, '2023-07-25 04:47:30', '2023-07-25 04:47:30'),
(7, 122, 2, '2023-07-25 04:47:39', '2023-07-25 04:47:39'),
(8, 222, 3, '2023-07-25 04:47:48', '2023-07-25 04:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_customer` int(11) DEFAULT NULL,
  `id_tipe_kamar` int(11) DEFAULT NULL,
  `nomor_pemesanan` int(11) NOT NULL,
  `nama_customer` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tanggal_pemesanan` datetime DEFAULT NULL,
  `tanggal_check_in` datetime DEFAULT NULL,
  `tanggal_check_out` datetime DEFAULT NULL,
  `nama_tamu` varchar(255) DEFAULT NULL,
  `total_kamar` int(11) DEFAULT NULL,
  `status_pemesanan` enum('baru','check_in','check_out') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pemesanan`
--

INSERT INTO `pemesanan` (`id_pemesanan`, `id_user`, `id_customer`, `id_tipe_kamar`, `nomor_pemesanan`, `nama_customer`, `email`, `tanggal_pemesanan`, `tanggal_check_in`, `tanggal_check_out`, `nama_tamu`, `total_kamar`, `status_pemesanan`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 1, 65857, 'rahardain eka yudistira', 'rahardian20@gmail.com', '2023-05-25 00:00:00', '2023-05-26 00:00:00', '2023-05-31 00:00:00', 'rahardian', 1, 'check_out', '2023-05-25 13:36:06', '2023-10-10 07:55:43'),
(3, 2, 1, 3, 27367, 'rahardain eka yudistira', 'rahardian20@gmail.com', '2023-07-25 00:00:00', '2023-07-25 00:00:00', '2023-07-31 00:00:00', 'sugenk', 2, 'check_out', '2023-07-25 04:48:23', '2023-07-25 06:45:09'),
(4, 2, 3, 1, 66336, 'jepi', 'yt005881@gmail.com', '2023-07-25 00:00:00', '2023-07-25 00:00:00', '2023-07-31 00:00:00', 'sugenk', 2, 'check_in', '2023-07-25 06:06:49', '2023-10-11 03:10:50'),
(5, 2, 1, 2, 33201, 'rahardain eka yudistira', 'rahardian20@gmail.com', '2023-07-25 00:00:00', '2023-07-25 00:00:00', '2023-07-31 00:00:00', 'rahardian', 1, 'check_in', '2023-07-25 06:42:00', '2023-10-11 03:10:06'),
(6, 2, 3, 3, 32460, 'jepi', 'yt005881@gmail.com', '2023-07-25 00:00:00', '2023-07-25 00:00:00', '2023-07-31 00:00:00', 'suga', 2, 'check_in', '2023-07-25 06:48:32', '2023-10-11 03:10:03'),
(7, 2, 3, 1, 48407, 'jepi', 'yt005881@gmail.com', '2023-10-11 00:00:00', '2023-10-11 00:00:00', '2023-10-13 00:00:00', 'rahardian', 2, 'check_in', '2023-10-11 03:07:16', '2023-10-11 03:10:00'),
(8, 2, 3, 1, 93073, 'jepi', 'yt005881@gmail.com', '2023-10-11 00:00:00', '2023-10-19 00:00:00', '2023-10-21 00:00:00', 'anto', 2, 'check_in', '2023-10-11 03:22:39', '2023-10-11 07:44:38'),
(9, 2, 3, 2, 12342, 'jepi', 'yt005881@gmail.com', '2023-10-11 00:00:00', '2023-10-11 00:00:00', '2023-10-13 00:00:00', 'anto', 2, 'check_in', '2023-10-11 07:41:04', '2023-10-11 07:44:33'),
(10, 2, 3, 3, 35347, 'jepi', 'yt005881@gmail.com', '2023-10-11 00:00:00', '2023-10-11 00:00:00', '2023-10-13 00:00:00', 'anto', 1, 'check_out', '2023-10-11 08:00:06', '2023-10-11 08:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230117131506-create-room-type.js'),
('20230117140614-create-room.js'),
('20230117210736-create-user.js'),
('20230118012308-create-customer.js'),
('20230118110940-create-booking.js'),
('20230118111105-create-detail-booking.js');

-- --------------------------------------------------------

--
-- Table structure for table `tipe_kamar`
--

CREATE TABLE `tipe_kamar` (
  `id_tipe_kamar` int(11) NOT NULL,
  `nama_tipe_kamar` varchar(255) NOT NULL,
  `harga` int(11) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipe_kamar`
--

INSERT INTO `tipe_kamar` (`id_tipe_kamar`, `nama_tipe_kamar`, `harga`, `deskripsi`, `foto`, `createdAt`, `updatedAt`) VALUES
(1, 'kamarrakyat', 2147483647, 'mimpiindah', 'foto-1696924239176.jpg', '2023-05-25 13:29:19', '2023-10-10 07:50:39'),
(2, 'kamarpresiden', 23123123, 'dasdada', 'foto-1696924246246.png', '2023-05-25 13:29:43', '2023-10-10 07:50:46'),
(3, 'kamarskena', 2000000, 'asdasjndjsadjasd', 'foto-1696924303279.jpg', '2023-07-25 04:45:49', '2023-10-10 07:51:43');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','resepsionis') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `foto`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(2, 'agus', 'foto-1685021431984.jpeg', 'agus@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'resepsionis', '2023-05-25 13:30:31', '2023-05-25 13:30:31'),
(5, 'memet', 'foto-1696350365713.jpeg', 'memet@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'admin', '2023-10-03 16:26:05', '2023-10-04 01:40:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  ADD PRIMARY KEY (`id_detail_pemesanan`),
  ADD KEY `id_pemesanan` (`id_pemesanan`),
  ADD KEY `id_kamar` (`id_kamar`);

--
-- Indexes for table `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`id_kamar`),
  ADD UNIQUE KEY `nomor_kamar` (`nomor_kamar`),
  ADD KEY `id_tipe_kamar` (`id_tipe_kamar`);

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`),
  ADD UNIQUE KEY `nomor_pemesanan` (`nomor_pemesanan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_customer` (`id_customer`),
  ADD KEY `id_tipe_kamar` (`id_tipe_kamar`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  ADD PRIMARY KEY (`id_tipe_kamar`),
  ADD UNIQUE KEY `nama_tipe_kamar` (`nama_tipe_kamar`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  MODIFY `id_detail_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `kamar`
--
ALTER TABLE `kamar`
  MODIFY `id_kamar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  MODIFY `id_tipe_kamar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  ADD CONSTRAINT `detail_pemesanan_ibfk_1` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan` (`id_pemesanan`),
  ADD CONSTRAINT `detail_pemesanan_ibfk_2` FOREIGN KEY (`id_kamar`) REFERENCES `kamar` (`id_kamar`);

--
-- Constraints for table `kamar`
--
ALTER TABLE `kamar`
  ADD CONSTRAINT `kamar_ibfk_1` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `tipe_kamar` (`id_tipe_kamar`);

--
-- Constraints for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `pemesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `pemesanan_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  ADD CONSTRAINT `pemesanan_ibfk_3` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `tipe_kamar` (`id_tipe_kamar`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
