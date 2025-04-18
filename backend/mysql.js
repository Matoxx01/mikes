const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

connection.connect(function(err){
    if(err){
        console.log('Error connecting to MySQL: ' + err.code);
        console.log('Error connecting to MySQL: ' + err.fatal);
        return;
    }
    console.log('Conexion a MySQL exitosa.');
})

// Función para comprobar la clave en la base de datos
function checkPassword(password, callback) {
    const query = 'SELECT role, name FROM employee WHERE password = ? LIMIT 1';
    connection.query(query, [password], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        // Se encontró la clave, se retorna el role y name
        return callback(null, results[0]);
      } else {
        // No se encontró coincidencia
        return callback(null, null);
      }
    });
}

function getClient(callback) {
  const query = 'SELECT idClient, name FROM client';
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
}
  
module.exports = { checkPassword, getClient };