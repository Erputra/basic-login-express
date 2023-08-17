const express = require('express');

// memuat module body-parser.
const bodyParser = require('body-parser');

// memuat file authRoutes.js agar route yang telah di siapkan di file tersebut dapat digunakan di sini.
const authRoutes = require('./routes/authRoutes'); // Path to your authRoutes
const app = express();

// mengambil nilai PORT dari file .env atau bila kosong maka PORT akan bernilai 3000.
const PORT = process.env.PORT || 3000;

// Menggunakan bodyParser untuk membaca data dari body permintaan untuk data dalam format JSON.
// karna nanti saat testing menggunakan postman raw body json jadi ini perlu di setting.
app.use(bodyParser.json());

// app express mengunakan authRoutes sehingga route yang telah disiapkan dapat diakses.
app.use(authRoutes);

// menjalankan app ke PORT.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
