-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2025 at 08:39 AM
-- Server version: 10.5.23-MariaDB-0+deb11u1
-- PHP Version: 8.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy`
--

-- --------------------------------------------------------

--
-- Table structure for table `historyCutis`
--

CREATE TABLE `historyCutis` (
  `id` int(11) NOT NULL,
  `role` enum('employee','head','gm') NOT NULL,
  `actor` varchar(100) NOT NULL,
  `action` enum('submit','approve','reject','revision') NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `req_cuti_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historyCutis`
--

INSERT INTO `historyCutis` (`id`, `role`, `actor`, `action`, `comment`, `createdAt`, `updatedAt`, `req_cuti_id`, `user_id`) VALUES
(1, 'head', '', 'reject', NULL, '2025-10-29 15:20:26', '2025-10-29 15:20:26', 1, NULL),
(2, 'head', '', 'reject', 'Kamu Pembohong sepertinya', '2025-10-29 15:21:27', '2025-10-29 15:21:27', 1, NULL),
(3, 'head', '', 'reject', 'Kamu Pembohong sepertinya', '2025-10-29 15:22:32', '2025-10-29 15:22:32', 1, 1),
(4, 'employee', '', 'submit', NULL, '2025-10-29 15:26:33', '2025-10-29 15:26:33', 2, 1),
(5, 'head', '', 'revision', 'Perpanjang Liburan', '2025-10-29 15:27:36', '2025-10-29 15:27:36', 2, 1),
(6, 'head', '', 'approve', '', '2025-10-29 15:30:29', '2025-10-29 15:30:29', 2, 1),
(7, 'head', '', 'approve', '', '2025-10-29 15:44:48', '2025-10-29 15:44:48', 2, 1),
(8, 'head', '', 'approve', '', '2025-10-29 15:47:29', '2025-10-29 15:47:29', 2, 1),
(9, 'head', '', 'approve', 'Appruf', '2025-10-29 15:47:52', '2025-10-29 15:47:52', 2, 1),
(10, 'gm', '', 'revision', 'revision', '2025-10-29 15:50:18', '2025-10-29 15:50:18', 2, 1),
(11, 'gm', '', 'approve', 'revision', '2025-10-29 15:50:29', '2025-10-29 15:50:29', 2, 1),
(12, 'gm', '', 'approve', 'revision', '2025-10-29 15:51:12', '2025-10-29 15:51:12', 2, 1),
(13, 'gm', '', 'approve', 'revision', '2025-10-29 15:54:00', '2025-10-29 15:54:00', 2, 1),
(14, 'gm', '', 'reject', 'revision', '2025-10-29 15:54:10', '2025-10-29 15:54:10', 2, 1),
(15, 'gm', '', 'reject', 'revision', '2025-10-29 15:54:37', '2025-10-29 15:54:37', 2, 1),
(16, 'gm', '', 'reject', 'revision', '2025-10-29 15:56:26', '2025-10-29 15:56:26', 2, 1),
(17, 'gm', '', 'reject', 'revision', '2025-10-29 15:56:28', '2025-10-29 15:56:28', 2, 1),
(18, 'gm', '', 'reject', 'revision', '2025-10-29 15:56:47', '2025-10-29 15:56:47', 2, 1),
(19, 'gm', '', 'revision', 'revision', '2025-10-29 15:58:51', '2025-10-29 15:58:51', 2, 1),
(20, 'head', '', 'reject', 'revision', '2025-10-29 16:00:23', '2025-10-29 16:00:23', 2, 1),
(21, 'head', '', 'revision', 'revision', '2025-10-29 16:00:29', '2025-10-29 16:00:29', 2, 1),
(22, 'head', '', 'approve', 'revision', '2025-10-29 16:00:33', '2025-10-29 16:00:33', 2, 1),
(23, 'gm', '', 'approve', 'revision', '2025-10-29 16:02:12', '2025-10-29 16:02:12', 2, 1),
(24, 'employee', '', 'submit', NULL, '2025-10-30 07:36:19', '2025-10-30 07:36:19', 3, 1),
(25, 'head', '', 'revision', 'revision', '2025-10-30 07:42:48', '2025-10-30 07:42:48', 1, 1),
(26, 'head', '', 'revision', 'revision', '2025-10-30 07:47:27', '2025-10-30 07:47:27', 1, 1),
(27, 'employee', '', 'submit', NULL, '2025-10-30 14:23:04', '2025-10-30 14:23:04', 4, 2),
(28, 'head', '', 'revision', 'revision', '2025-10-30 15:36:12', '2025-10-30 15:36:12', 1, 1),
(29, 'head', '', 'revision', 'revision', '2025-10-30 15:44:46', '2025-10-30 15:44:46', 1, 1),
(30, 'gm', '', 'revision', 'revision', '2025-10-30 15:52:23', '2025-10-30 15:52:23', 1, 1),
(31, 'gm', '', 'approve', 'revision', '2025-10-30 15:55:02', '2025-10-30 15:55:02', 1, 1),
(32, 'gm', '', 'approve', '', '2025-10-30 16:11:38', '2025-10-30 16:11:38', 3, 1),
(33, 'gm', '', 'revision', '', '2025-10-30 16:12:01', '2025-10-30 16:12:01', 3, 1),
(34, 'gm', '', 'revision', 'revision', '2025-10-30 16:39:52', '2025-10-30 16:39:52', 1, 1),
(35, 'gm', '', 'revision', 'revision', '2025-10-30 16:43:26', '2025-10-30 16:43:26', 1, 1),
(36, 'head', '', 'revision', 'revision', '2025-10-30 16:43:48', '2025-10-30 16:43:48', 1, 1),
(37, 'head', '', 'approve', '', '2025-10-30 16:44:08', '2025-10-30 16:44:08', 2, 1),
(38, 'head', '', 'revision', 'revision', '2025-10-30 17:31:44', '2025-10-30 17:31:44', 1, 1),
(39, 'head', '', 'revision', 'revision', '2025-10-30 17:56:50', '2025-10-30 17:56:50', 1, 1),
(40, 'head', '', 'revision', 'revision', '2025-10-30 18:01:36', '2025-10-30 18:01:36', 1, 1),
(41, 'head', '', 'revision', 'revision', '2025-10-30 18:02:14', '2025-10-30 18:02:14', 1, 1),
(42, 'head', '', 'revision', 'revision', '2025-10-30 18:02:23', '2025-10-30 18:02:23', 1, 1),
(43, 'head', '', 'revision', 'revision', '2025-10-30 18:02:51', '2025-10-30 18:02:51', 1, 1),
(44, 'head', '', 'revision', 'revision', '2025-10-30 18:03:27', '2025-10-30 18:03:27', 1, 1),
(45, 'head', '', 'revision', 'revision', '2025-10-30 18:03:31', '2025-10-30 18:03:31', 2, 1),
(46, 'head', '', 'revision', 'revision', '2025-10-30 18:03:55', '2025-10-30 18:03:55', 2, 1),
(47, 'head', '', 'revision', 'revision', '2025-10-30 18:04:27', '2025-10-30 18:04:27', 2, 1),
(48, 'head', '', 'revision', 'revision', '2025-10-30 18:05:56', '2025-10-30 18:05:56', 3, 1),
(49, 'head', '', 'revision', 'revision', '2025-10-30 18:06:42', '2025-10-30 18:06:42', 3, 1),
(50, 'employee', '', 'submit', NULL, '2025-10-30 19:09:37', '2025-10-30 19:09:37', 5, 2),
(51, 'head', '', 'approve', '', '2025-10-30 23:26:29', '2025-10-30 23:26:29', 4, 2),
(52, 'head', '', 'revision', 'Test', '2025-10-30 23:26:42', '2025-10-30 23:26:42', 5, 2),
(53, 'employee', '', 'submit', NULL, '2025-10-30 23:59:28', '2025-10-30 23:59:28', 6, 2),
(54, 'employee', '', 'submit', NULL, '2025-10-30 23:59:31', '2025-10-30 23:59:31', 7, 2),
(55, 'employee', '', 'submit', NULL, '2025-10-30 23:59:35', '2025-10-30 23:59:35', 8, 2),
(56, 'employee', '', 'submit', NULL, '2025-10-30 23:59:36', '2025-10-30 23:59:36', 9, 2),
(57, 'employee', '', 'submit', NULL, '2025-10-30 23:59:38', '2025-10-30 23:59:38', 10, 2),
(58, 'employee', '', 'submit', NULL, '2025-10-30 23:59:39', '2025-10-30 23:59:39', 11, 2),
(59, 'employee', '', 'submit', NULL, '2025-10-31 00:31:37', '2025-10-31 00:31:37', 12, 2),
(60, 'employee', '', 'submit', NULL, '2025-10-31 00:32:14', '2025-10-31 00:32:14', 13, 2),
(61, 'head', '', 'submit', '', '2025-10-31 00:33:55', '2025-10-31 00:33:55', 6, 2),
(62, 'employee', 'employee1', 'submit', NULL, '2025-10-31 00:35:26', '2025-10-31 00:35:26', 15, 2),
(63, 'head', 'head1', 'submit', 'revision', '2025-10-31 00:37:35', '2025-10-31 00:37:35', 3, 1),
(64, 'head', 'head1', 'submit', 'revision', '2025-10-31 00:37:39', '2025-10-31 00:37:39', 15, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historyCutis`
--
ALTER TABLE `historyCutis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_request_id` (`req_cuti_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historyCutis`
--
ALTER TABLE `historyCutis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historyCutis`
--
ALTER TABLE `historyCutis`
  ADD CONSTRAINT `historyCutis_ibfk_43` FOREIGN KEY (`req_cuti_id`) REFERENCES `req_cutis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historyCutis_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
