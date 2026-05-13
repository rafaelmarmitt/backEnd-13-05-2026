require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(conn => {
        console.log('Conectado ao MySQL com sucesso!')
    })
    .catch(err => {
        console.error('Erro ao conectar-se ao MySQL: ', err.message)
    })

module.exports = db