const express = require('express')
const { hanldeGenerateNewShortURL } = require('../controllers/url.controller')

const router = express.Router()

router .post('/', hanldeGenerateNewShortURL)


module.exports = router