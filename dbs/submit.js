const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

exports.submit = (req, res) => {
    console.log(res.body)
    const { title, date, content } = res.body

    let query = 'INSERT INTO blog_test SET ?'
    db.query(query, {title: title, date: date, content: content }, (err, result) => {
        if(err) throw err
        console.log(result)
    })
}
