const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const uri = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI, { 
    dbName: "shortUrl",
    auth: {
        username: user,
        password: password
    }
 })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb connect error')
})

db.once('open', () => {
    console.log('mongodb connected')
})

module.exports = db