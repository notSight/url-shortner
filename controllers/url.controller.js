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

module.exports = { hanldeGenerateNewShortURL }

