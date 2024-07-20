const User = require("../models/user.model")

async function handleUserSignup(req,res){
    const{ name, email, password } = req.body
    await User.create({name, email, password})
    return res.json({message: 'User created successfully'})
}

module.exports = {
    handleUserSignup
}

