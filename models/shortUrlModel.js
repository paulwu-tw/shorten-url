const mongoose = require('mongoose')
const schema = mongoose.Schema

const shortUrlSchema = new schema({
    oriUrl: {
        type: String,
        unique: true,
        require: true
    },
    shortUrl: {
        type: String,
        unique: true,
        require: true
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)