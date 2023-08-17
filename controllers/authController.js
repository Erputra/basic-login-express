const bcrypt = require('bcrypt'); // memuat modul bcrypt dan menampung ke variable bcrypt
const jwt = require('jsonwebtoken'); // memuat module jsonwebtoken dan menampung ke variable jwt
const { PrismaClient } = require('@prisma/client'); // destructuring assignment untuk mengimpor kelas PrismaClient dari modul @prisma/client
const prisma = new PrismaClient(); // membuat instance dari kelas PrismaClient

const register = async (req, res) => {
    const {username, password} = req.body; // destructuring assignment

    try {
        hashedPassword = await bcrypt.hash(password,10); // melakukan hashing password dengan cost factor 10, semakin tinggi cost factor akan semakin lama operasi hashing dilakukan
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        res.json({message : 'User registered successfully', user});
    } catch (error) {
        res.status(500).json({message: 'Error registering user'});
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);

        // Return the JWT token as a response
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
}

const getProfile = async (req, res) => {
    // mengambil data user yang di dapatkan dari file authMiddleware.js
    const username = req.user;
    res.json({ message: `Welcome to your profile ${username}!` });
}

module.exports = {
    register,
    login,
    getProfile,
};