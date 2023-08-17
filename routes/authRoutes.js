// memuat express module.
const express = require('express');

// memuat authController agar function di dalamnya dapat di panggil di sini.
const authController = require('../controllers/authController');

// memuat authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');

// memuat function Router dari express agar dapat mengunakan routing bawaan express.
const router = express.Router();

// membuat route dengan nama register dan mengarahkan ke function register yang berada di authController.js
// semisal ingin membuat data baru maka harus mengkakses http://localhost:3000/register denggan http method post.
router.post('/register', authController.register);
router.post('/login', authController.login);

// menambahkan middleware untuk mengamankan route profile
router.get('/profile', authMiddleware, authController.getProfile);

// mengexport router agar dapat di panggil oleh index.js
module.exports = router;
