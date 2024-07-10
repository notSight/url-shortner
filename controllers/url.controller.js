const Shortid = require('shortid')
const URL = require('../models/url.model')
const shortid = require('shortid')

async function hanldeGenerateNewShortURL(req,res){
    const body = req.body
    if(!body.url){
        return res.status(400).json({error: 'URL is required'})
    }
    const shortId = Shortid(8)
    await URL.create({
        originalUrl: body.url,
        shortId: shortId,
        visitHistory: []
    })
    return res.status(201).json({ Id: shortId })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
     })
}


module.exports = { hanldeGenerateNewShortURL,
    handleGetAnalytics
 }

