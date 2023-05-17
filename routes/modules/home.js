const express = require('express')
const router = express.Router()

const shortUrlModel = require('../../models/shortUrlModel')
const shorten = require('../../utils/shorten')

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
                shortUrl = shorten.shorten()
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