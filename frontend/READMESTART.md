# 🏖️ CutiApp

Aplikasi manajemen cuti karyawan berbasis **Express.js** dan **React.js**.  
Memungkinkan pegawai untuk mengajukan cuti, mengunggah lampiran, serta memantau riwayat dan status pengajuan.

---

JALANKAN PERINTAH SQL DAHULU pada file roles.sql,historycutis,reqCutis

## 🚀 Setup Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Trenchkid0/absence.git
cd cutiapp
```

cd backend

npm install

============================

Buat File .env

Isi dengan konfigurasi berikut:

PORT=5000
DB_HOST=
DB_USER=root
DB_PASS=
DB_NAME=
JWT_SECRET=

Lalu jalankan

npm run dev

============================

cd frontend

npm install

npm run dev

Nama Variabel Deskripsi
PORT Port untuk backend (misal: 5000)
DB_HOST Host database
DB_USER Username database
DB_PASS Password database
DB_NAME Nama database
JWT_SECRET Secret key untuk JWT authentication

📡 API Endpoint Documentation
🔑 Auth
Method Endpoint Deskripsi
POST /api/v1/signin Login user dan mendapatkan JWT token
🗂️ Cuti
Method Endpoint Deskripsi Role
GET /api/v1/cuti Menampilkan semua pengajuan cuti Semua user (auth)
GET /api/v1/cuti/:id Mendapatkan detail cuti berdasarkan ID Semua user (auth)
GET /api/v1/cuti/user/:userId Mendapatkan daftar cuti milik user tertentu Semua user (auth)
POST /api/v1/cuti Membuat pengajuan cuti baru (dengan attachment opsional) Employee (role 1)
PUT /api/v1/cuti/:id Mengubah status pengajuan cuti Head (role 2), GM (role 3)
PUT /api/v1/cuti/revision/:id Revisi data cuti (dengan file baru opsional) Employee (role 1)
🕓 History Cuti
Method Endpoint Deskripsi Role
GET /api/v1/historyCuti Menampilkan semua riwayat cuti Head & GM (role 2,3)
GET /api/v1/historyCuti/user/:userId Menampilkan riwayat cuti milik user tertentu Head & GM (role 2,3)
