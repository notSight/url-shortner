const {v4: uuidv4} = require('uuid')
const User = require("../models/user.model")
const { setUser, getUser } = require('../service/auth.service')
const { set } = require('mongoose')

async function handleUserSignup(req,res){
    const{ name, email, password } = req.body
    await User.create({name, email, password})
    res.render('signup-success.ejs', { userName: name });
}

async function handleUserLogin(req,res){
    const{ email, password } = req.body
    const user = await User.findOne({email, password})
    if(!user){
        return res.render('login-failed.ejs')
    }

    const token = setUser(user)
    res.cookie('uid', token)
    res.render('login-success.ejs', { userName: user.name });
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}

