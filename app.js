const express = require('express')
const mysql = require('mysql')
const route = require('./routes/routes')
const path = require('path')

const app = express()

// allow public files to work
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// allow accessing the body of html
app.use(express.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

db.connect((err) => {
    if (err) throw err
    console.log('Database well connected')
})
 
// parse ejs engine to use
app.set('view engine', 'ejs')

// calling routes from routes folder
app.use('/', route)

app.listen(8000, () => {
    console.log('server up and running')
})
