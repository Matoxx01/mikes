const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: 'root',
    password: process.env.PASS,
    database: 'mike'
})

connection.connect(function(err){
    if(err){
        console.log('Error connecting to MySQL: ' + err.code);
        console.log('Error connecting to MySQL: ' + err.fatal);
        return;
    }
    console.log('Conexión a MySQL exitosa.');
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
  
module.exports = { checkPassword };