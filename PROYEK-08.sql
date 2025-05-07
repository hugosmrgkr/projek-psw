CREATE DATABASE tapatupadb;
USE tapatupadb;

-- Create and populate jenisPermohonan table
CREATE TABLE jenisPermohonan (
    idJenisPermohonan INT PRIMARY KEY,
    parentId INT,
    jenisPermohonan VARCHAR(255),
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO jenisPermohonan (idJenisPermohonan, parentId, jenisPermohonan, keterangan, createAt, updateAt, isDeleted) VALUES
(1, NULL, 'Permohonan Awal', 'Permohonan pertama kali sewa', NOW(), NOW(), 0),
(2, NULL, 'Perpanjangan', 'Permohonan untuk memperpanjang', NOW(), NOW(), 0),
(3, NULL, 'Pemutusan', 'Pengakhiran sewa sebelum waktunya', NOW(), NOW(), 0),
(4, 1, 'Permohonan Cabang', 'Permohonan untuk cabang baru', NOW(), NOW(), 0),
(5, NULL, 'Izin Khusus', 'Permohonan untuk keperluan khusus', NOW(), NOW(), 0),
(6, NULL, 'Permohonan Event', 'Sewa untuk acara tertentu', NOW(), NOW(), 0),
(7, 6, 'Event Musiman', 'Sewa acara musiman seperti pasar malam', NOW(), NOW(), 0),
(8, NULL, 'Test Permohonan', 'Digunakan untuk testing sistem', NOW(), NOW(), 1),
(9, NULL, 'Cadangan', 'Jenis permohonan tidak aktif', NOW(), NOW(), 1),
(10, NULL, 'Khitanan Massal', 'Permohonan untuk kegiatan sosial', NOW(), NOW(), 0);



INSERT INTO userRole (idUserRole, keterangan, userRole, createAt, updateAt, isDeleted) VALUES
(1, 'Administrator sistem', 'Admin', NOW(), NOW(), 0),
(2, 'Petugas teknis', 'Teknis', NOW(), NOW(), 0),
(3, 'Verifikator', 'Verifikator', NOW(), NOW(), 0),
(4, 'Penyetuju', 'Approval', NOW(), NOW(), 0),
(5, 'Pemohon', 'Wajib Retribusi', NOW(), NOW(), 0),
(6, 'Viewer', 'Pengamat', NOW(), NOW(), 1),
(7, 'Auditor', 'Auditor', NOW(), NOW(), 0),
(8, 'Backup Admin', 'Admin Backup', NOW(), NOW(), 1),
(9, 'Role Test', 'Testing Only', NOW(), NOW(), 1),
(10, 'Support Staff', 'Helpdesk', NOW(), NOW(), 0);

-- Create and populate user_ table
CREATE TABLE user_ (
    userId INT PRIMARY KEY,
    idUserRole INT,
    idPersonal INT,
    username VARCHAR(255),
    password_ VARCHAR(255),
    token TEXT,
    email VARCHAR(255),
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idUserRole) REFERENCES userRole(idUserRole)
);

INSERT INTO user_ (userId, idUserRole, idPersonal, username, password_, token, email, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 1, 1001, 'hugo', 'pass123', 'token1', 'hugo@example.com', 'Admin utama', NOW(), NOW(), 0),
(2, 2, 1002, 'novsi', 'pass456', 'token2', 'novsi@example.com', 'Teknis area A', NOW(), NOW(), 0),
(3, 3, 1003, 'novi', 'pass789', 'token3', 'novi@example.com', 'Verifikator', NOW(), NOW(), 0),
(4, 4, 1004, 'monalisa', 'pass321', 'token4', 'mona@example.com', 'Approval 1', NOW(), NOW(), 0),
(5, 5, 1005, 'henock', 'pass654', 'token5', 'henock@example.com', 'Pemohon', NOW(), NOW(), 0),
(6, 1, 1006, 'aldi', 'pass987', 'token6', 'aldi@example.com', 'Admin 2', NOW(), NOW(), 1),
(7, 2, 1007, 'gio', 'pass741', 'token7', 'gio@example.com', 'Teknis area B', NOW(), NOW(), 0),
(8, 3, 1008, 'mona', 'pass852', 'token8', 'mona@example.com', 'Verifikator 2', NOW(), NOW(), 0),
(9, 4, 1009, 'novsiana', 'pass963', 'token9', 'novsiana@example.com', 'Approval backup', NOW(), NOW(), 1),
(10, 5, 1010, 'fahrel', 'pass159', 'token10', 'fahrel@example.com', 'Pemohon cadangan', NOW(), NOW(), 0);

-- Create and populate jenisJangkaWaktu table
CREATE TABLE jenisJangkaWaktu (
    idJenisJangkaWaktu INT PRIMARY KEY,
    jenisJangkaWaktu VARCHAR(255),
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO jenisJangkaWaktu (idJenisJangkaWaktu, jenisJangkaWaktu, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 'Tahunan', 'Periode sewa tahunan', NOW(), NOW(), 0),
(2, 'Bulanan', 'Periode sewa bulanan', NOW(), NOW(), 0),
(3, 'Mingguan', 'Periode sewa mingguan', NOW(), NOW(), 0),
(4, 'Harian', 'Periode sewa harian', NOW(), NOW(), 0),
(5, 'Musiman', 'Untuk event musiman', NOW(), NOW(), 0),
(6, 'Sementara', 'Periode percobaan', NOW(), NOW(), 1),
(7, 'Paket', 'Paket khusus gabungan waktu', NOW(), NOW(), 0),
(8, 'Event Only', 'Khusus event tertentu', NOW(), NOW(), 0),
(9, 'Custom', 'Waktu custom', NOW(), NOW(), 1),
(10, 'Promo', 'Durasi untuk promo khusus', NOW(), NOW(), 0);

-- Create and populate peruntukanSewa table
CREATE TABLE peruntukanSewa (
    idPeruntukanSewa INT PRIMARY KEY,
    jenisKegiatan VARCHAR(255),
    peruntukanSewa TEXT,
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO peruntukanSewa (idPeruntukanSewa, jenisKegiatan, peruntukanSewa, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 'Toko', 'Usaha perdagangan', 'Sewa kios untuk jual beli', NOW(), NOW(), 0),
(2, 'Kantor', 'Perkantoran', 'Untuk kegiatan administrasi', NOW(), NOW(), 0),
(3, 'Gudang', 'Penyimpanan barang', 'Sewa gudang logistik', NOW(), NOW(), 0),
(4, 'Warung', 'Makanan/minuman', 'Usaha kuliner kecil', NOW(), NOW(), 0),
(5, 'Event', 'Acara publik', 'Event komunitas atau pemerintah', NOW(), NOW(), 0),
(6, 'Lapak Musiman', 'Pasar tiban', 'Lapak temporer seperti Ramadan', NOW(), NOW(), 0),
(7, 'Parkir', 'Parkir kendaraan', 'Tempat parkir umum atau pribadi', NOW(), NOW(), 1),
(8, 'Studio', 'Foto/video', 'Keperluan produksi konten', NOW(), NOW(), 0),
(9, 'Pos Jaga', 'Keamanan', 'Untuk petugas keamanan', NOW(), NOW(), 0),
(10, 'Testing', 'Data percobaan', 'Digunakan untuk test input', NOW(), NOW(), 1);

-- Create and populate jenisStatus table
CREATE TABLE jenisStatus (
    idJenisStatus INT PRIMARY KEY,
    jenisStatus VARCHAR(255),
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO jenisStatus (idJenisStatus, jenisStatus, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 'Baru', 'Status awal permohonan', NOW(), NOW(), 0),
(2, 'Diproses', 'Sedang dalam proses', NOW(), NOW(), 0),
(3, 'Disetujui', 'Telah disetujui', NOW(), NOW(), 0),
(4, 'Ditolak', 'Permohonan tidak diterima', NOW(), NOW(), 0),
(5, 'Ditunda', 'Perlu waktu tambahan', NOW(), NOW(), 0),
(6, 'Direvisi', 'Perlu perbaikan data', NOW(), NOW(), 0),
(7, 'Selesai', 'Sewa telah berakhir', NOW(), NOW(), 0),
(8, 'Batal', 'Dibatalkan oleh pemohon', NOW(), NOW(), 1),
(9, 'Kedaluwarsa', 'Lewat batas waktu', NOW(), NOW(), 1),
(10, 'Uji Coba', 'Status untuk testing sistem', NOW(), NOW(), 1);

-- Create and populate status_ table
CREATE TABLE status_ (
    idStatus INT PRIMARY KEY,
    idJenisStatus INT,
    namaStatus VARCHAR(255),
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idJenisStatus) REFERENCES jenisStatus(idJenisStatus)
);

INSERT INTO status_ (idStatus, idJenisStatus, namaStatus, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 1, 'Baru Masuk', 'Permohonan baru masuk sistem', NOW(), NOW(), 0),
(2, 2, 'Diproses Teknis', 'Sedang diverifikasi teknis', NOW(), NOW(), 0),
(3, 3, 'Telah Disetujui', 'Telah melewati semua tahapan', NOW(), NOW(), 0),
(4, 4, 'Tidak Disetujui', 'Data tidak valid', NOW(), NOW(), 0),
(5, 5, 'Pending', 'Menunggu keputusan akhir', NOW(), NOW(), 0),
(6, 6, 'Perlu Revisi', 'Data permohonan harus diperbaiki', NOW(), NOW(), 0),
(7, 7, 'Selesai', 'Permohonan sudah selesai', NOW(), NOW(), 0),
(8, 8, 'Dibatalkan', 'Pemohon membatalkan permohonan', NOW(), NOW(), 1),
(9, 9, 'Expired', 'Data sudah kedaluwarsa', NOW(), NOW(), 1),
(10, 10, 'Status Dummy', 'Digunakan untuk simulasi sistem', NOW(), NOW(), 1);

-- Create and populate lokasiObjekRetribusi table
CREATE TABLE lokasiObjekRetribusi (
    idLokasiObjekRetribusi INT PRIMARY KEY,
    lokasiObjekRetribusi TEXT,
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO lokasiObjekRetribusi (idLokasiObjekRetribusi, lokasiObjekRetribusi, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 'Lokasi A - Perkotaan', 'Area padat penduduk', NOW(), NOW(), FALSE),
(2, 'Lokasi B - Pinggiran', 'Area sub-urban', NOW(), NOW(), FALSE),
(3, 'Lokasi C - Industri', 'Kawasan pabrik', NOW(), NOW(), FALSE),
(4, 'Lokasi D - Perumahan', 'Area residensial', NOW(), NOW(), FALSE),
(5, 'Lokasi E - Komersil', 'Pusat bisnis', NOW(), NOW(), FALSE),
(6, 'Lokasi F - Pedesaan', 'Area agrikultur', NOW(), NOW(), FALSE),
(7, 'Lokasi G - Pusat Kota', 'Daerah utama', NOW(), NOW(), FALSE),
(8, 'Lokasi H - Pelabuhan', 'Dekat area laut', NOW(), NOW(), FALSE),
(9, 'Lokasi I - Bandara', 'Dekat area udara', NOW(), NOW(), FALSE),
(10, 'Lokasi J - Wisata', 'Kawasan turis', NOW(), NOW(), FALSE);

-- Create and populate jenisObjekRetribusi table
CREATE TABLE jenisObjekRetribusi (
    idJenisObjekRetribusi INT PRIMARY KEY,
    jenisObjekRetribusi TEXT,
    keterangan TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO jenisObjekRetribusi (idJenisObjekRetribusi, jenisObjekRetribusi, keterangan, createAt, updateAt, isDeleted) VALUES
(1, 'Rumah Tinggal', 'Digunakan sebagai tempat tinggal', NOW(), NOW(), FALSE),
(2, 'Bangunan Komersil', 'Digunakan untuk usaha/bisnis', NOW(), NOW(), FALSE),
(3, 'Lahan Kosong', 'Tanah tidak terbangun', NOW(), NOW(), FALSE),
(4, 'Pabrik', 'Bangunan industri', NOW(), NOW(), FALSE),
(5, 'Gudang', 'Tempat penyimpanan barang', NOW(), NOW(), FALSE),
(6, 'Apartemen', 'Unit hunian vertikal', NOW(), NOW(), FALSE),
(7, 'Ruko', 'Rumah dan toko', NOW(), NOW(), FALSE),
(8, 'Kantor', 'Gedung perkantoran', NOW(), NOW(), FALSE),
(9, 'Hotel', 'Penginapan', NOW(), NOW(), FALSE),
(10, 'Bangunan Publik', 'Sekolah, Rumah Sakit, dll.', NOW(), NOW(), FALSE);

-- Create and populate objekRetribusi table
CREATE TABLE objekRetribusi (
    idObjekRetribusi INT PRIMARY KEY,
    idLokasiObjekRetribusi INT,
    idJenisObjekRetribusi INT,
    kodeObjekRetribusi VARCHAR(255),
    noBangunan VARCHAR(255),
    jumlahLantai INT,
    objekRetribusi TEXT,
    panjangTanah DOUBLE,
    lebarTanah DOUBLE,
    luasTanah DOUBLE,
    panjangBangunan DOUBLE,
    lebarBangunan DOUBLE,
    luasBangunan DOUBLE,
    alamat TEXT,
    latitude DOUBLE,
    longitude DOUBLE,
    keterangan TEXT,
    gambarDenahTanah TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idLokasiObjekRetribusi) REFERENCES lokasiObjekRetribusi(idLokasiObjekRetribusi),
    FOREIGN KEY (idJenisObjekRetribusi) REFERENCES jenisObjekRetribusi(idJenisObjekRetribusi)
);

INSERT INTO objekRetribusi (
    idObjekRetribusi,
    idLokasiObjekRetribusi,
    idJenisObjekRetribusi,
    kodeObjekRetribusi,
    noBangunan,
    jumlahLantai,
    objekRetribusi,
    panjangTanah,
    lebarTanah,
    luasTanah,
    panjangBangunan,
    lebarBangunan,
    luasBangunan,
    alamat,
    latitude,
    longitude,
    keterangan,
    gambarDenahTanah,
    createAt,
    updateAt,
    isDeleted
) VALUES
(1001, 1, 1, 'OR-001', 'N-001', 2, 'Objek 1 - Rumah Tinggal', 20.0, 10.0, 200.0, 15.0, 8.0, 120.0, 'Jl. Mawar No.1', -6.2100, 106.8500, 'Dummy Data 1', NULL, NOW(), NOW(), FALSE),
(1002, 2, 2, 'OR-002', 'N-002', 3, 'Objek 2 - Toko', 15.0, 8.0, 120.0, 12.0, 7.0, 84.0, 'Jl. Melati No.2', -6.2150, 106.8510, 'Dummy Data 2', NULL, NOW(), NOW(), FALSE),
(1003, 3, 3, 'OR-003', 'N/A', 0, 'Objek 3 - Lahan Kosong', 30.0, 25.0, 750.0, 0.0, 0.0, 0.0, 'Jl. Anggrek No.3', -6.2200, 106.8520, 'Dummy Data 3', NULL, NOW(), NOW(), FALSE),
(1004, 4, 4, 'OR-004', 'N-004', 1, 'Objek 4 - Gudang', 40.0, 30.0, 1200.0, 35.0, 25.0, 875.0, 'Jl. Tulip No.4', -6.2250, 106.8530, 'Dummy Data 4', NULL, NOW(), NOW(), FALSE),
(1005, 5, 5, 'OR-005', 'N-005', 5, 'Objek 5 - Kantor', 25.0, 20.0, 500.0, 20.0, 15.0, 300.0, 'Jl. Dahlia No.5', -6.2300, 106.8540, 'Dummy Data 5', NULL, NOW(), NOW(), FALSE),
(1006, 6, 6, 'OR-006', 'N-006', 10, 'Objek 6 - Apartemen', 50.0, 40.0, 2000.0, 45.0, 35.0, 1575.0, 'Jl. Kamboja No.6', -6.2350, 106.8550, 'Dummy Data 6', NULL, NOW(), NOW(), FALSE),
(1007, 7, 7, 'OR-007', 'N-007', 2, 'Objek 7 - Ruko', 18.0, 9.0, 162.0, 15.0, 8.0, 120.0, 'Jl. Lili No.7', -6.2400, 106.8560, 'Dummy Data 7', NULL, NOW(), NOW(), FALSE),
(1008, 8, 8, 'OR-008', 'N-008', 6, 'Objek 8 - Hotel', 60.0, 50.0, 3000.0, 55.0, 45.0, 2475.0, 'Jl. Teratai No.8', -6.2450, 106.8570, 'Dummy Data 8', NULL, NOW(), NOW(), FALSE),
(1009, 9, 9, 'OR-009', 'N-009', 1, 'Objek 9 - Bengkel', 22.0, 12.0, 264.0, 20.0, 10.0, 200.0, 'Jl. Bougenville No.9', -6.2500, 106.8580, 'Dummy Data 9', NULL, NOW(), NOW(), FALSE),
(1010, 10, 10, 'OR-010', 'N-010', 4, 'Objek 10 - Restoran', 28.0, 15.0, 420.0, 25.0, 13.0, 325.0, 'Jl. Matahari No.10', -6.2550, 106.8590, 'Dummy Data 10', NULL, NOW(), NOW(), FALSE);

SELECT * FROM objekRetribusi;

-- Create and populate tarifObjekRetribusi table
CREATE TABLE tarifObjekRetribusi (
    idTarifObjekRetribusi INT PRIMARY KEY,
    idObjekRetribusi INT,
    idJenisJangkaWaktu INT,
    tanggalDinilai DATE,
    namaPenilai VARCHAR(255),
    nominalTarif DOUBLE,
    floorHasilPenilaian DOUBLE,
    keterangan TEXT,
    isDefault BOOLEAN,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idObjekRetribusi) REFERENCES objekRetribusi(idObjekRetribusi),
    FOREIGN KEY (idJenisJangkaWaktu) REFERENCES jenisJangkaWaktu(idJenisJangkaWaktu)
);

INSERT INTO tarifObjekRetribusi (
    idTarifObjekRetribusi,
    idObjekRetribusi,
    idJenisJangkaWaktu,
    tanggalDinilai,
    namaPenilai,
    nominalTarif,
    floorHasilPenilaian,
    keterangan,
    isDefault,
    createAt,
    updateAt,
    isDeleted
) VALUES
(1, 1001, 1, '2024-01-15', 'Penilai A', 5000000.0, 4500000.0, 'Tarif tahunan rumah tinggal', TRUE, NOW(), NOW(), FALSE),
(2, 1002, 2, '2024-01-16', 'Penilai B', 500000.0, 450000.0, 'Tarif bulanan toko', TRUE, NOW(), NOW(), FALSE),
(3, 1003, 1, '2024-01-17', 'Penilai C', 2000000.0, 1800000.0, 'Tarif tahunan lahan kosong', TRUE, NOW(), NOW(), FALSE),
(4, 1004, 2, '2024-01-18', 'Penilai D', 800000.0, 750000.0, 'Tarif bulanan gudang', TRUE, NOW(), NOW(), FALSE),
(5, 1005, 1, '2024-01-19', 'Penilai E', 12000000.0, 11000000.0, 'Tarif tahunan kantor', TRUE, NOW(), NOW(), FALSE),
(6, 1006, 1, '2024-01-20', 'Penilai A', 15000000.0, 14000000.0, 'Tarif tahunan apartemen', TRUE, NOW(), NOW(), FALSE),
(7, 1007, 2, '2024-01-21', 'Penilai B', 1200000.0, 1100000.0, 'Tarif bulanan ruko', TRUE, NOW(), NOW(), FALSE),
(8, 1008, 1, '2024-01-22', 'Penilai C', 25000000.0, 23000000.0, 'Tarif tahunan hotel', TRUE, NOW(), NOW(), FALSE),
(9, 1009, 3, '2024-01-23', 'Penilai D', 300000.0, 280000.0, 'Tarif mingguan bengkel', TRUE, NOW(), NOW(), FALSE),
(10, 1010, 2, '2024-01-24', 'Penilai E', 1500000.0, 1400000.0, 'Tarif bulanan restoran', TRUE, NOW(), NOW(), FALSE);

-- Create and populate jangkaWaktuSewa table
CREATE TABLE jangkaWaktuSewa (
    idJangkaWaktuSewa INT PRIMARY KEY,
    idJenisJangkaWaktu INT,
    jangkaWaktu VARCHAR(255),
    keterangan TEXT,
    isDefault BOOLEAN,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idJenisJangkaWaktu) REFERENCES jenisJangkaWaktu(idJenisJangkaWaktu)
);

INSERT INTO jangkaWaktuSewa (
    idJangkaWaktuSewa,
    idJenisJangkaWaktu,
    jangkaWaktu,
    keterangan,
    isDefault,
    createAt,
    updateAt,
    isDeleted
) VALUES
(1, 1, '1 Tahun', 'Sewa selama 1 tahun', TRUE, NOW(), NOW(), FALSE),
(2, 1, '2 Tahun', 'Sewa selama 2 tahun', FALSE, NOW(), NOW(), FALSE),
(3, 1, '3 Tahun', 'Sewa selama 3 tahun', FALSE, NOW(), NOW(), FALSE),
(4, 2, '1 Bulan', 'Sewa selama 1 bulan', TRUE, NOW(), NOW(), FALSE),
(5, 2, '3 Bulan', 'Sewa selama 3 bulan', FALSE, NOW(), NOW(), FALSE),
(6, 2, '6 Bulan', 'Sewa selama 6 bulan', FALSE, NOW(), NOW(), FALSE),
(7, 3, '1 Minggu', 'Sewa selama 1 minggu', TRUE, NOW(), NOW(), FALSE),
(8, 3, '2 Minggu', 'Sewa selama 2 minggu', FALSE, NOW(), NOW(), FALSE),
(9, 4, '1 Hari', 'Sewa selama 1 hari', TRUE, NOW(), NOW(), FALSE),
(10, 4, '3 Hari', 'Sewa selama 3 hari', FALSE, NOW(), NOW(), FALSE);

-- Create and populate wajibRetribusi table
CREATE TABLE wajibRetribusi (
    idWajibRetribusi INT PRIMARY KEY,
    idJenisWajibRetribusi INT,
    NIK VARCHAR(20),
    namaWajibRetribusi VARCHAR(255),
    pekerjaan VARCHAR(255),
    alamat TEXT,
    nomorPonsel VARCHAR(15),
    nomorWhatsapp VARCHAR(15),
    email VARCHAR(255),
    idJenisRetribusi INT,
    fileFoto TEXT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN
);

INSERT INTO wajibRetribusi (
    idWajibRetribusi,  -- Explicitly including the ID column
    idJenisWajibRetribusi,
    NIK,
    namaWajibRetribusi,
    pekerjaan,
    alamat,
    nomorPonsel,
    nomorWhatsapp,
    email,
    idJenisRetribusi,
    fileFoto,
    createAt,
    updateAt,
    isDeleted
) VALUES
(101, 1, '1234567890123456', 'Hugo', 'Pedagang', 'Jl. Anggrek No. 10', '081234567890', '081234567890', 'hugo@email.com', 1, 'foto1.jpg', NOW(), NOW(), FALSE),
(102, 2, '2345678901234567', 'Siti Aminah', 'Pegawai Swasta', 'Jl. Melati No. 15', '082345678901', '082345678901', 'siti@email.com', 2, 'foto2.jpg', NOW(), NOW(), FALSE),
(103, 1, '3456789012345678', 'Rudi Hartono', 'Wiraswasta', 'Jl. Mawar No. 20', '083456789012', '083456789012', 'rudi@email.com', 1, 'foto3.jpg', NOW(), NOW(), FALSE),
(104, 2, '4567890123456789', 'Dewi Sulistyo', 'Pengacara', 'Jl. Dahlia No. 25', '084567890123', '084567890123', 'dewi@email.com', 3, 'foto4.jpg', NOW(), NOW(), FALSE),
(105, 1, '5678901234567890', 'Ahmad Wahyudi', 'Dokter', 'Jl. Tulip No. 30', '085678901234', '085678901234', 'ahmad@email.com', 2, 'foto5.jpg', NOW(), NOW(), FALSE),
(106, 3, '6789012345678901', 'Rina Fitriani', 'Guru', 'Jl. Kamboja No. 35', '086789012345', '086789012345', 'rina@email.com', 4, 'foto6.jpg', NOW(), NOW(), FALSE),
(107, 2, '7890123456789012', 'Eko Prasetyo', 'Arsitek', 'Jl. Kenanga No. 40', '087890123456', '087890123456', 'eko@email.com', 1, 'foto7.jpg', NOW(), NOW(), FALSE),
(108, 1, '8901234567890123', 'Wulandari', 'Akuntan', 'Jl. Kenanga No. 45', '088901234567', '088901234567', 'wulandari@email.com', 1, 'foto8.jpg', NOW(), NOW(), FALSE),
(109, 2, '9012345678901234', 'Lina Susanti', 'Arsitek', 'Jl. Cempaka No. 50', '089012345678', '089012345678', 'lina@email.com', 1, 'foto9.jpg', NOW(), NOW(), FALSE),
(110, 2, '0123456789012345', 'Budi Prasetyo', 'Pengusaha', 'Jl. Bougenville No. 55', '090123456789', '090123456789', 'budi.prasetyo@email.com', 1, 'foto10.jpg', NOW(), NOW(), FALSE);


CREATE TABLE permohonanSewa (
    idPermohonanSewa INT PRIMARY KEY,
    idJenisPermohonan INT,
    nomorSuratPermohonan VARCHAR(255),
    tanggalPengajuan DATE,
    idWajibRetribusi INT,
    idObjekRetribusi INT,
    idJenisJangkaWaktu INT,
    lamaSewa INT,
    idPeruntukanSewa INT,
    idStatus INT,
    createBy INT,
    createAt DATETIME,
    updateAt DATETIME,
    isDeleted BOOLEAN,
    FOREIGN KEY (idJenisPermohonan) REFERENCES jenisPermohonan(idJenisPermohonan),
    FOREIGN KEY (idWajibRetribusi) REFERENCES wajibRetribusi(idWajibRetribusi),
    FOREIGN KEY (idObjekRetribusi) REFERENCES objekRetribusi(idObjekRetribusi),
    FOREIGN KEY (idJenisJangkaWaktu) REFERENCES jenisJangkaWaktu(idJenisJangkaWaktu),
    FOREIGN KEY (idPeruntukanSewa) REFERENCES peruntukanSewa(idPeruntukanSewa),
    FOREIGN KEY (idStatus) REFERENCES status_(idStatus),
    FOREIGN KEY (createBy) REFERENCES user_(userId)
);

INSERT INTO permohonanSewa (
    idPermohonanSewa,
    idJenisPermohonan,
    nomorSuratPermohonan,
    tanggalPengajuan,
    idWajibRetribusi,
    idObjekRetribusi,
    idJenisJangkaWaktu,
    lamaSewa,
    idPeruntukanSewa,
    idStatus,
    createBy,
    createAt,
    updateAt,
    isDeleted
) VALUES
(1, 1, 'PERM/2024/001', '2024-01-10', 101, 1001, 1, 12, 1, 3, 5, '2024-01-10 09:00:00', '2024-01-15 14:30:00', FALSE),
(2, 2, 'PERM/2024/002', '2024-01-15', 102, 1002, 2, 6, 1, 3, 5, '2024-01-15 10:15:00', '2024-01-20 16:45:00', FALSE),
(3, 1, 'PERM/2024/003', '2024-02-05', 103, 1003, 1, 24, 3, 2, 5, '2024-02-05 08:30:00', '2024-02-07 11:20:00', FALSE),
(4, 6, 'PERM/2024/004', '2024-02-12', 104, 1004, 4, 3, 5, 1, 5, '2024-02-12 13:45:00', '2024-02-12 13:45:00', FALSE),
(5, 1, 'PERM/2024/005', '2024-03-01', 105, 1005, 1, 36, 2, 6, 5, '2024-03-01 09:30:00', '2024-03-05 15:10:00', FALSE),
(6, 5, 'PERM/2024/006', '2024-03-10', 106, 1006, 2, 3, 5, 4, 5, '2024-03-10 11:00:00', '2024-03-12 10:20:00', FALSE),
(7, 7, 'PERM/2024/007', '2024-03-20', 107, 1007, 5, 1, 6, 5, 5, '2024-03-20 14:15:00', '2024-03-22 09:30:00', FALSE),
(8, 3, 'PERM/2024/008', '2024-04-05', 108, 1008, 1, 0, 9, 3, 5, '2024-04-05 10:30:00', '2024-04-08 16:45:00', FALSE),
(9, 4, 'PERM/2024/009', '2024-04-15', 109, 1009, 3, 12, 9, 2, 5, '2024-04-15 08:45:00', '2024-04-17 11:30:00', FALSE),
(10, 1, 'PERM/2024/010', '2024-04-25', 110, 1010, 2, 6, 4, 7, 5, '2024-04-25 13:00:00', '2024-04-30 15:20:00', FALSE);


-- 3b. menggunakan table jenis permohonan untuk tugas pembuatan query

-- 1. Menampilkan semua jenis permohonan yang aktif
SELECT idJenisPermohonan, jenisPermohonan, keterangan
FROM jenisPermohonan
WHERE isDeleted = 0
ORDER BY idJenisPermohonan;

-- 2. Menampilkan jenis permohonan induk saja (yang tidak memiliki parent)
SELECT idJenisPermohonan, jenisPermohonan, keterangan
FROM jenisPermohonan
WHERE parentId IS NULL AND isDeleted = 0
ORDER BY jenisPermohonan;

-- 3. melihat semua sub-jenis tanpa memperhatikan induk 
SELECT idJenisPermohonan, jenisPermohonan, parentId
FROM jenisPermohonan
WHERE isDeleted = 0 AND parentId IS NOT NULL
ORDER BY parentId, jenisPermohonan;

-- 4. Menghitung jumlah total jenis permohonan yang aktif dan tidak aktif
SELECT 
    SUM(CASE WHEN isDeleted = 0 THEN 1 ELSE 0 END) AS jumlah_aktif,
    SUM(CASE WHEN isDeleted = 1 THEN 1 ELSE 0 END) AS jumlah_tidak_aktif
FROM jenisPermohonan;

-- 5. Mencari jenis permohonan berdasarkan kata kunci
SELECT idJenisPermohonan, jenisPermohonan, keterangan
FROM jenisPermohonan
WHERE jenisPermohonan LIKE '%permohonan%' AND isDeleted = 0
ORDER BY jenisPermohonan;

-- 6. menampilkan jenis permohonan dan tanggal pembuatannya
SELECT idJenisPermohonan, jenisPermohonan, createAt
FROM jenisPermohonan
WHERE isDeleted = 0
ORDER BY createAt DESC;

-- 7.menghitung jumlah jenis permohonan
SELECT COUNT(*) AS jumlah_jenis_permohonan
FROM jenisPermohonan
WHERE isDeleted = 0;

-- 8. mencari jenis permohonan berdasarkan keterangan
SELECT idJenisPermohonan, jenisPermohonan, keterangan
FROM jenisPermohonan
WHERE keterangan LIKE '%sosial%' AND isDeleted = 0;

-- 9. menampilkan jenis permohonan yang diupdate terbaru
SELECT idJenisPermohonan, jenisPermohonan, updateAt
FROM jenisPermohonan
WHERE isDeleted = 0
ORDER BY updateAt DESC
LIMIT 5;

-- 10.mencari permohonan dengan kata "Event
SELECT jenisPermohonan
FROM jenisPermohonan
WHERE jenisPermohonan LIKE '%Event%';



-- 3c. ObjekRetribusi dan table LokasiObjekRetribusi

-- 1. Menampilkan data objek retribusi beserta informasi lokasinya
SELECT o.idObjekRetribusi, o.kodeObjekRetribusi, o.objekRetribusi, 
       l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
INNER JOIN lokasiObjekRetribusi l 
ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi;

-- 2. Mencari objek retribusi yang berada di lokasi komersil
SELECT o.idObjekRetribusi, o.objekRetribusi, o.alamat, l.lokasiObjekRetribusi
FROM objekRetribusi o
INNER JOIN lokasiObjekRetribusi l 
ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE l.lokasiObjekRetribusi LIKE '%Komersil%';

-- 3. Menampilkan total luas bangunan per jenis lokasi
SELECT l.lokasiObjekRetribusi, SUM(o.luasBangunan) AS totalLuasBangunan
FROM objekRetribusi o
INNER JOIN lokasiObjekRetribusi l 
ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
GROUP BY l.lokasiObjekRetribusi
ORDER BY totalLuasBangunan DESC;

-- 4. Menampilkan semua lokasi dan objek retribusi yang terdaftar (termasuk lokasi tanpa objek):
SELECT l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi, 
       o.idObjekRetribusi, o.objekRetribusi
FROM lokasiObjekRetribusi l
LEFT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi;

-- 5. Mencari lokasi yang tidak memiliki objek retribusi
SELECT l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM lokasiObjekRetribusi l
LEFT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi
WHERE o.idObjekRetribusi IS NULL;

-- 6. Menghitung jumlah objek retribusi per lokasi (termasuk lokasi tanpa objek)
SELECT l.lokasiObjekRetribusi, COUNT(o.idObjekRetribusi) AS jumlahObjek
FROM lokasiObjekRetribusi l
LEFT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi
GROUP BY l.lokasiObjekRetribusi
ORDER BY jumlahObjek DESC;

-- 7. Menampilkan semua objek retribusi dan informasi lokasi mereka (termasuk objek tanpa lokasi):
SELECT o.idObjekRetribusi, o.objekRetribusi, 
       l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM lokasiObjekRetribusi l
RIGHT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi;

-- 8. Mencari objek retribusi yang memiliki jumlah lantai lebih dari 3 beserta lokasi:
SELECT o.idObjekRetribusi, o.objekRetribusi, o.jumlahLantai, l.lokasiObjekRetribusi
FROM lokasiObjekRetribusi l
RIGHT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi
WHERE o.jumlahLantai > 3
ORDER BY o.jumlahLantai DESC;

-- 9. Menampilkan rata-rata luas tanah per lokasi objek retribusi:
SELECT l.lokasiObjekRetribusi, AVG(o.luasTanah) AS rataRataLuasTanah
FROM lokasiObjekRetribusi l
RIGHT JOIN objekRetribusi o 
ON l.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi
GROUP BY l.lokasiObjekRetribusi;

-- 10. Menghasilkan kombinasi lengkap dari semua objek retribusi dengan semua lokasi:
SELECT o.idObjekRetribusi, o.objekRetribusi, 
       l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
CROSS JOIN lokasiObjekRetribusi l;

-- 11. Membandingkan setiap objek retribusi dengan lokasi yang memiliki keterangan terkait industri:
SELECT o.idObjekRetribusi, o.objekRetribusi, l.lokasiObjekRetribusi, l.keterangan
FROM objekRetribusi o
CROSS JOIN lokasiObjekRetribusi l
WHERE l.keterangan LIKE '%industri%';

-- 12. Menampilkan semua objek retribusi dan semua lokasi (termasuk yang tidak memiliki pasangan):
SELECT o.idObjekRetribusi, o.objekRetribusi, l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
LEFT JOIN lokasiObjekRetribusi l ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
UNION
SELECT o.idObjekRetribusi, o.objekRetribusi, l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
RIGHT JOIN lokasiObjekRetribusi l ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE o.idObjekRetribusi IS NULL;

-- 13. Mencari objek atau lokasi yang tidak memiliki pasangan:
SELECT o.idObjekRetribusi, o.objekRetribusi, l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
LEFT JOIN lokasiObjekRetribusi l ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE l.idLokasiObjekRetribusi IS NULL
UNION
SELECT o.idObjekRetribusi, o.objekRetribusi, l.idLokasiObjekRetribusi, l.lokasiObjekRetribusi
FROM objekRetribusi o
RIGHT JOIN lokasiObjekRetribusi l ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE o.idObjekRetribusi IS NULL;

-- 14.Menganalisis objek retribusi berdasarkan rasio luas bangunan terhadap luas tanah:
SELECT o.idObjekRetribusi, o.objekRetribusi, 
       l.lokasiObjekRetribusi,
       o.luasBangunan, o.luasTanah,
       (o.luasBangunan / o.luasTanah * 100) AS persentaseTebangun
FROM objekRetribusi o
INNER JOIN lokasiObjekRetribusi l 
ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE o.luasTanah > 0
ORDER BY persentaseTebangun DESC;

-- 15. Menampilkan objek retribusi yang memiliki luas bangunan di atas rata-rata berdasarkan lokasi:
SELECT o.idObjekRetribusi, o.objekRetribusi, o.luasBangunan,
       l.lokasiObjekRetribusi,
       (SELECT AVG(o2.luasBangunan) 
        FROM objekRetribusi o2 
        WHERE o2.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi) AS rataRataLuasBangunan
FROM objekRetribusi o
INNER JOIN lokasiObjekRetribusi l 
ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE o.luasBangunan > (SELECT AVG(o3.luasBangunan) 
                       FROM objekRetribusi o3 
                       WHERE o3.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi)
ORDER BY l.lokasiObjekRetribusi, o.luasBangunan DESC;

-- 3d.SubQuery

-- 1. Menampilkan objek retribusi yang memiliki luas bangunan di atas rata-rata
SELECT 
    idObjekRetribusi,
    objekRetribusi,
    luasBangunan
FROM objekRetribusi
WHERE luasBangunan > (
    SELECT AVG(luasBangunan) 
    FROM objekRetribusi
);

-- 2. Menampilkan objek retribusi dengan perbandingan terhadap luas bangunan rata-rata
SELECT 
    idObjekRetribusi,
    objekRetribusi,
    luasBangunan,
    (SELECT AVG(luasBangunan) FROM objekRetribusi) AS rataRataLuasBangunan
FROM objekRetribusi;

-- 3. Mencari objek retribusi yang berada di lokasi perkotaan atau komersil
SELECT 
    idObjekRetribusi,
    objekRetribusi,
    alamat
FROM objekRetribusi
WHERE idLokasiObjekRetribusi IN (
    SELECT idLokasiObjekRetribusi
    FROM lokasiObjekRetribusi
    WHERE lokasiObjekRetribusi LIKE '%Perkotaan%' 
    OR lokasiObjekRetribusi LIKE '%Komersil%'
);

-- 4.Mencari lokasi yang memiliki minimal satu objek dengan jumlah lantai lebih dari 3
SELECT 
    idLokasiObjekRetribusi,
    lokasiObjekRetribusi
FROM lokasiObjekRetribusi l
WHERE EXISTS (
    SELECT 1
    FROM objekRetribusi o
    WHERE o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
    AND o.jumlahLantai > 3
);

-- 5. Menampilkan rata-rata luas tanah untuk setiap lokas
SELECT 
    lokasi.idLokasiObjekRetribusi,
    lokasi.lokasiObjekRetribusi,
    avg_luas.rata_rata
FROM lokasiObjekRetribusi lokasi
JOIN (
    SELECT 
        idLokasiObjekRetribusi, 
        AVG(luasTanah) AS rata_rata
    FROM objekRetribusi
    GROUP BY idLokasiObjekRetribusi
) avg_luas ON lokasi.idLokasiObjekRetribusi = avg_luas.idLokasiObjekRetribusi;

-- 6. Mencari lokasi yang tidak memiliki objek retribusi
SELECT 
    idLokasiObjekRetribusi,
    lokasiObjekRetribusi
FROM lokasiObjekRetribusi
WHERE idLokasiObjekRetribusi NOT IN (
    SELECT DISTINCT idLokasiObjekRetribusi
    FROM objekRetribusi
    WHERE idLokasiObjekRetribusi IS NOT NULL
);

-- 7. Mencari objek retribusi yang memiliki luas bangunan lebih besar dari luas bangunan rata-rata di lokasinyaSELECT 
SELECT 
    o.idObjekRetribusi,
    o.objekRetribusi,
    o.luasBangunan,
    l.lokasiObjekRetribusi
FROM objekRetribusi o
JOIN lokasiObjekRetribusi l ON o.idLokasiObjekRetribusi = l.idLokasiObjekRetribusi
WHERE o.luasBangunan > (
    SELECT AVG(luasBangunan)
    FROM objekRetribusi o2
    WHERE o2.idLokasiObjekRetribusi = o.idLokasiObjekRetribusi
);

DESCRIBE user_;
ALTER TABLE user_ MODIFY COLUMN userId INT NULL;
ALTER TABLE user_ MODIFY COLUMN userId INT DEFAULT 1;
DELETE FROM user_ WHERE userId = 1;
	ALTER TABLE user_ AUTO_INCREMENT = 1;
