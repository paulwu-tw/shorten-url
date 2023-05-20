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
            if (isExist) {
                shortUrl = isExist.shortUrl
                res.render('index', { shortUrl: serverUrl + '/' + shortUrl })
            } else {
                shortUrl = shorten.shorten()
                shortUrlModel.create({ oriUrl, shortUrl })
                    .then(() => {
                        res.render('index', { shortUrl: serverUrl + '/' + shortUrl })
                    }).catch(err => res.render('errPage', { err }))
            }
        }).catch(err => res.render('errPage', { err }))

})

// get short url, redirect to original url
router.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl
    shortUrlModel.findOne({ shortUrl })
        .lean()
        .then(result => {
            if (result) res.redirect(result.oriUrl)
            else res.render('errPage', { err: 'This short url is not exist.' })
        })
        .catch(err => res.render('errPage', { err }))

})

module.exports = router