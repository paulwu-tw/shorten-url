const express = require('express')
const router = express.Router()

const shortUrlModel = require('../../models/shortUrlModel')

function shorten() {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    const upperChars = chars.toUpperCase()
    const numbers = '1234567890'

    let collection = []
    collection = collection.concat(chars.split(''))
    collection = collection.concat(upperChars.split(''))
    collection = collection.concat(numbers.split(''))

    let shortUrl = ''
    for (let i = 0; i < 5; i++) {
        shortUrl += collection[Math.floor(Math.random() * collection.length)]
    }
    console.log('Short Url: ', shortUrl)
    return shortUrl
}

router.get('/', (req, res) => {
    res.render('index')
})

// shorten url  POST /
router.post('/', (req, res) => {
    const serverUrl = req.protocol + '://' + req.get('host')
    const oriUrl = req.body.oriUrl
    let shortUrl = ''
    shortUrlModel.findOne({ oriUrl })
        .lean()
        .then(isExist => {
            if (isExist) shortUrl = isExist.shortUrl
            else {
                shortUrl = shorten()
                shortUrlModel.create({ oriUrl, shortUrl })
                    .catch(err => console.log(err))
            }
            shortUrl = serverUrl + '/' + shortUrl
            res.render('index', { shortUrl })
        }).catch(err => console.log(err))

})

// get short url, redirect to original url
router.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl
    shortUrlModel.findOne({ shortUrl })
    .lean()
    .then(result => {
        if (result) res.redirect(result.oriUrl)
    })
    .catch(err => console.log(err))

})

module.exports = router