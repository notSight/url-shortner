const express = require('express')
const path = require('path')
const { connectDB } = require('./conectDB.js')
const URL = require('./models/url.model.js')
const urlRoute = require('./routes/url.routes.js')

const app = express()

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/test', async (req,res)=>{
    const allUrls = await URL.find({})
    res.render('homepage', { urls: allUrls })
})

app.use('/url', urlRoute)

app.get('/url/:shortId', async (req,res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },{ $push: { 
        visitHistory: { timestamp: Date.now() } 
    }})
    res.redirect(entry.originalUrl)
})

connectDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDB connected!!'))
