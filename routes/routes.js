const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.configDotenv({ path: './.env'})

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

// main page
router.get('/', (req, res) => {
	res.render('main');
});

// calling all blogs for displaying
router.get('/blog', (req, res) => {
    db.query('SELECT * FROM blogs ORDER BY ID asc', (err, rows) => {
        if(err) {
            req.flash('error ', err)
            res.render('blog', { data: ''})
        }
        else {
            res.render('blog', { data: rows })
        }
    })
})

// calling the form page to adding data
router.get('/page/form', (req, res) => {
    res.render('form')
})

// inserting data into the database
router.post('/form/add', (req, res) => {
    isValid = true
    
    if(isValid){
        const title = req.body.title
        const date = req.body.date
        const content = req.body.content

        db.query('INSERT INTO blogs SET ?', { title: title, date: date, content: content }, (err, result) => {
            if(err) throw err
        })
        res.redirect('/blog')
    }
    else {
        console.log('error happened')
        res.send('data invalid not not added. <a href="/b/"><-- go back</a>')
        res.redirect('/')
    }
})

// getting data to be edited
router.get('/form/:id', (req, res) => {
    isValid = true
    
    if(isValid){        
        db.query(`SELECT * FROM blogs WHERE ID = '${req.params.id}'`, (err, result) => {
            const id = req.params.id
            let i = result
            i.forEach((element) => {
                if(err) throw err
                res.render('update', { title: element['title'], date: element['date'], content: element['content'], id })
            });
        })
    }
    else {
        console.log('error happened')
        res.send('NO SUCH DATA <a href="/blog/"><- back</a>')
    }
})

// editing data in database
router.post('/edit-form/:id', (req, res) => {    
    const data = req.body
    const id = req.params.id

    db.query(`UPDATE blogs SET ? WHERE ID = ?`, [ data, id ], (err, result) => {
        if(err) throw err
        console.log('results are '+result)
    })
    res.redirect('/table')
})

// deleting data from database
router.get('/delete-form/:id', (req, res) => {
    // res.render('delete', {id: req.params.id})

    isValid = true
    
    if(isValid){
        db.query(`DELETE FROM blogs WHERE ID = '${req.params.id}'`, req.params.id, (err, result) => {
            if(err) throw err
        })
        res.redirect('/table')
    }
    else {
        console.log('error happened')
        res.send('data invalid not not added. <a href="/table"><-- go back</a>')
    }
})

// calling table page.
router.get('/table', (req, res) => {
    db.query('SELECT * FROM blogs ORDER BY ID asc', (err, rows) => {
        if(err) {
            req.flash('error ', err)
            res.render('table', { data: ''})
        }
        else {
            res.render('table', { data: rows })
        }
    })
})

module.exports = router;