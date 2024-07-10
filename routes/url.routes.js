const express = require('express')
const { hanldeGenerateNewShortURL,
    handleGetAnalytics
 } = require('../controllers/url.controller')

const router = express.Router()

router.post('/', hanldeGenerateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics)


module.exports = router

