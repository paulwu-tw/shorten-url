const express = require('express')
const hbs = require('express-handlebars')
require('./config/mongoose')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', hbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(routes)




app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})