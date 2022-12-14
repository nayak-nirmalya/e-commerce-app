const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-store',
    password: 'nirmalya'
})

module.exports = pool.promise()