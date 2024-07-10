const express = require('express')
const { connectDB } = require('./conectDB.js')
const URL = require('./models/url.model.js')
const urlRoute = require('./routes/url.routes.js')

const app = express()

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use(express.json())

app.use('/url', urlRoute)

app.get('/:shortId', async (req,res) => {
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
