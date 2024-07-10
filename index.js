const express = require('express')
const { connectDB } = require('./conectDB.js')
const urlRout = require('./routes/url.routes.js')

const app = express()

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use(express.json())

app.use('/url', urlRout)

connectDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDB connected!!'))
