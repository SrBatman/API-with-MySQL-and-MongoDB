const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = async (req, res) => {
  const { username, password } = req.body;

 
  const userjwt = process.env.JWT_USER;
  const passjwt = process.env.JWT_PASS;
  const secretKey = process.env.JWT_TOKEN;

  try {
   
    if (username !== userjwt || password !== passjwt) return res.status(401).json({ error: "Credenciales no válidas" });
    

    
    const payload = {
      username,
      role: "admin",
    };

    // Firmar el token con la clave secreta
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    // Enviar el token al cliente
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error al generar el token:", error.message);
    return res.status(500).json({ error: "Error inesperado" });
  }
};

module.exports = { Token };