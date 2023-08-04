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

// blogs
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

router.get('/page/form', (req, res) => {
    res.render('form')
})

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

router.route('/form/:id')
.get((req, res) => {
    isValid = true
    
    if(isValid){        
        db.query(`SELECT * FROM blogs WHERE ID = '${req.params.id}'`, (err, result) => {
            if(err) throw err
            // console.log(result)
            res.render('update', { title: result.title, date: result.date, content: result.content })
        })
    }
    else {
        console.log('error happened')
        res.send('NO SUCH DATA <a href="/blog/"><- back</a>')
    }
}).put((req, res) => {
    isValid = true
    
    if(isValid){
        const title = req.body.title
        const date = req.body.date
        const content = req.body.content

        db.query(`UPDATE blogs SET title = '${title}', date = '${date}', content = '${content}' WHERE ID = '${req.params.id}'`, (err, result) => {
            if(err) throw err
            console.log(result)
        })
        res.redirect('/blog')
    }
    else {
        console.log('error happened')
        res.send('data not update. <a href="/b/"><-- go back</a>')
    }
}).delete((req, res) => {
    res.send(`delete form with ID ${req.params.id}`)
    isValid = true
    
    if(isValid){
        db.query('DELETE FROM blogs WHERE ID = ' + req.params.id, (err, result) => {
            if(err) throw err
            console.log(result)
        })
        res.redirect('/b/blog')
    }
    else {
        console.log('error happened')
        res.send('data invalid not not added. <a href="/b/"><-- go back</a>')
        res.redirect('/b/')
    }
})

// table
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

// edits
router.get('/:id', (req, res) => {
    isValid = true
    if(isValid) {
        req.query('SELECT * FROM blog WHERE ')
    }
    res.render('update')
})

module.exports = router;