const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectDB } = require('./conectDB.js')
const URL = require('./models/url.model.js')
const { restrictToUserLoggedInUserOnly } = require('./middleware/auth.middleware.js')

const app = express()

const urlRoute = require('./routes/url.routes.js')
const staticRoute = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.routes.js')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/url', restrictToUserLoggedInUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)

app.get('/url/:shortId', async (req,res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },{ $push: { 
        visitHistory: { timestamp: Date.now() } 
    }})
    res.redirect(entry.originalUrl)
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

connectDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDB connected!!'))

