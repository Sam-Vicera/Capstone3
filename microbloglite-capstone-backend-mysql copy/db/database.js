require('dotenv-safe').config()
const mysql = require('mysql')
const util = require('util')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(error => {
    if(error) {
        console.error('Error connecting to the database: ' + error.stack)
        return
    }
    console.log('Connected to mysql.');
})

const query = util.promisify(db.query).bind(db)

module.exports = query