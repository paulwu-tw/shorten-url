const mongoose = require('mongoose')
const schema = mongoose.Schema

const shortUrlSchema = new schema({
    oriUrl: {
        type: String,
        require: true
    },
    shortUrl: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)