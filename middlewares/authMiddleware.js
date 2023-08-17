// memuat module jsonwebtoken
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // mengambil value token dari header dengan key x-auth-token
    const token = req.header('x-auth-token');

    // melakukan pemeriksaan apa bila token tidak di sertakan
    if (!token){
        return res.status(401).json({error: 'No token, authorization denied'});
    }

    try {
        // proses pemeriksaan apakah token valid, pemeriksaan mengunakan function bawaan jwt yaitu verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // mengambil data username dari token yang dikirimkan.
        req.user = decoded.username; 
        req.decodedToken = decoded;

        // melanjutkan request ke controller menggunakan function next()
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Token is not valid'});
    }
};

module.exports = authMiddleware;