const express = require('express');
const bodyParser = require('body-parser');
const { checkPassword, getClient } = require('./mysql');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

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

app.get('/client', (req, res) => {
  getClient((err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).json({ error: 'Error al obtener clientes' });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
