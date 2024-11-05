-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 02, 2024 lúc 12:27 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `barber`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chinhanh`
--

CREATE TABLE `chinhanh` (
  `id` int(11) NOT NULL,
  `tenchinhanh` varchar(50) NOT NULL,
  `diachi` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chinhanh`
--

INSERT INTO `chinhanh` (`id`, `tenchinhanh`, `diachi`) VALUES
(1, 'CN CAO LO QUAN 8', '180 Cao lo'),
(2, 'CN CUTCLUB QUAN 1', '19 Cao Lo'),
(6, 'CN Quận 10', '120 Thủ Đức  10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datlich`
--

CREATE TABLE `datlich` (
  `id` int(10) NOT NULL,
  `ngay` date NOT NULL,
  `gio` varchar(50) NOT NULL,
  `idchinhanh` int(11) NOT NULL,
  `iddichvu` int(11) NOT NULL,
  `idnhanvien` int(10) NOT NULL,
  `iduser` int(11) NOT NULL,
  `idtrangthai` int(11) NOT NULL,
  `tongtien` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `datlich`
--

INSERT INTO `datlich` (`id`, `ngay`, `gio`, `idchinhanh`, `iddichvu`, `idnhanvien`, `iduser`, `idtrangthai`, `tongtien`) VALUES
(1, '2024-10-31', '10:00', 2, 5, 5, 8, 1, '380000'),
(24, '2024-10-31', '10:00', 1, 5, 3, 3, 2, '380000'),
(26, '2024-10-10', '15:00', 1, 5, 2, 8, 3, '380000'),
(27, '2024-11-08', '09:00', 2, 1, 5, 8, 1, '100000'),
(28, '2024-11-07', '10:00', 2, 2, 5, 8, 4, '80000'),
(29, '2024-11-20', '16:00', 1, 5, 6, 8, 3, '380000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dichvu`
--

CREATE TABLE `dichvu` (
  `id` int(11) NOT NULL,
  `tendichvu` varchar(50) NOT NULL,
  `gia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dichvu`
--

INSERT INTO `dichvu` (`id`, `tendichvu`, `gia`) VALUES
(1, 'Cắt tóc', '100000'),
(2, 'Gội đầu', '80000'),
(3, 'Nhuộm tóc', '200000'),
(4, 'Cắt gội', '180000'),
(5, 'Cắt gội nhuộm', '380000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `id` int(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`id`, `email`, `ten`, `password`, `phone`) VALUES
(4, 'dwadwd@gmail.com', 'hihi2', '$2b$10$xTFbIdcKj8vaqtuTEExyc.hQdFX5TPfsxFd01egwMWT/cNZyVmaCq', '0394038505');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `id` int(10) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `id_vaitro` int(10) NOT NULL,
  `idchinhanh` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`id`, `ten`, `email`, `password`, `phone`, `id_vaitro`, `idchinhanh`) VALUES
(1, 'Tran Dat', 'letrandat@gmail.com', 'Dat123', '0123456789', 1, NULL),
(2, 'dat88', 'dat88@gmail.com', 'Dat123', '0884038504', 3, 1),
(3, 'Faker', 'hihihehe@gmail.com', 'Dat123', '0123456789', 2, 2),
(5, 'Chovy', 'hihihehe1@gmail.com', 'Dat123', '0123456789', 3, 2),
(6, 'Hihihehe', 'kakka@gmail.com', 'Dat123', '0123456789', 3, 1),
(7, 'dat', 'dat@gmail.com', '123', '0394038504', 3, 1),
(11, 'Keria', 'keria@gmail.com', '123', '0121751337', 3, 1),
(12, 'zzzz', 'zzz@gmail.com', '123', '0999999999', 3, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthai`
--

CREATE TABLE `trangthai` (
  `id` int(11) NOT NULL,
  `ten` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthai`
--

INSERT INTO `trangthai` (`id`, `ten`) VALUES
(1, 'Chờ xác nhận'),
(2, 'Đã xác nhận'),
(3, 'Đã Hoàn Thành'),
(4, 'Đã Hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `ten`, `phone`, `password`) VALUES
(3, 'uiyuiyu1@gmail.com', 'zzzzz', '0123456789', '$2b$10$rggBX2OsYGfhhURqdstEvu/C8/EsStNZi97hdMhptdm'),
(8, 'letrandat912@gmail.com', 'Lê Trần Đạt', '0394038504', '$2b$10$hTwCK9u2.SA5DGYnzEEVCOfP/chhQnXwSD7433ScY/kv/uMKDZUV6');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `id` int(10) NOT NULL,
  `tenVaiTro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro`
--

INSERT INTO `vaitro` (`id`, `tenVaiTro`) VALUES
(1, 'admin'),
(2, 'quanly'),
(3, 'nhanvien');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chinhanh`
--
ALTER TABLE `chinhanh`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `datlich`
--
ALTER TABLE `datlich`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkchinhanh` (`idchinhanh`),
  ADD KEY `fkdichvu` (`iddichvu`),
  ADD KEY `fknhanvien` (`idnhanvien`),
  ADD KEY `fkuser` (`iduser`),
  ADD KEY `fktrangthai` (`idtrangthai`);

--
-- Chỉ mục cho bảng `dichvu`
--
ALTER TABLE `dichvu`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vaitro` (`id_vaitro`),
  ADD KEY `chinhanh` (`idchinhanh`);

--
-- Chỉ mục cho bảng `trangthai`
--
ALTER TABLE `trangthai`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chinhanh`
--
ALTER TABLE `chinhanh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `datlich`
--
ALTER TABLE `datlich`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `dichvu`
--
ALTER TABLE `dichvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `trangthai`
--
ALTER TABLE `trangthai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `datlich`
--
ALTER TABLE `datlich`
  ADD CONSTRAINT `fkchinhanh` FOREIGN KEY (`idchinhanh`) REFERENCES `chinhanh` (`id`),
  ADD CONSTRAINT `fkdichvu` FOREIGN KEY (`iddichvu`) REFERENCES `dichvu` (`id`),
  ADD CONSTRAINT `fknhanvien` FOREIGN KEY (`idnhanvien`) REFERENCES `nhanvien` (`id`),
  ADD CONSTRAINT `fktrangthai` FOREIGN KEY (`idtrangthai`) REFERENCES `trangthai` (`id`),
  ADD CONSTRAINT `fkuser` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `chinhanh` FOREIGN KEY (`idchinhanh`) REFERENCES `chinhanh` (`id`),
  ADD CONSTRAINT `vaitro` FOREIGN KEY (`id_vaitro`) REFERENCES `vaitro` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
