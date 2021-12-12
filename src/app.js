const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

const news = require('./tools/newApi')
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/news', (req, res) => {
    if (!req.query.country) {
        return res.send({
            error: "you must add country"
        })
    }
    news(req.query.country, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        res.render('news', {
            data: data
        })
    })
})


app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        name: 'Default'
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})