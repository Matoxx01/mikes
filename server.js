const express = require('express');
const bodyParser = require('body-parser');
const { checkPassword } = require('./db/mysql');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir archivos estáticos (index.html, index.js, index.css, etc.)
app.use(express.static('public'));

// Endpoint para el login
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'No se proporcionó clave' });
  }

  checkPassword(password, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (result) {
      // Si la consulta retorna un registro, enviamos role y name
      res.json({ role: result.role, name: result.name });
    } else {
      // Si no se encontró coincidencia, enviamos error
      res.status(401).json({ error: 'Clave incorrecta' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
