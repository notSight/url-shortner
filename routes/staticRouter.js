const express = require('express')
const URL = require('../models/url.model.js')

const router = express.Router()

router.get('/', async(req,res) => {
    const allurls = await URL.find({})
    return res.render('homepage.ejs',{
        urls: allurls,
    })
})

router.get('/signup', (req,res) => {
    return res.render('signup.ejs')
})

router.get('/login', (req,res) => {
    return res.render('login.ejs')
})

module.exports = router

