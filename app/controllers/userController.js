const User = require('../models/user')
const { pick, omit } = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {}

userController.register = async (req, res) => {
    const body = pick(req.body, ['email','password','name','mobile','role'])
    if(body.role === 'admin'){
        res.json({
            notice : 'Bad Request'
        })
    } else {
        try {
            const user = new User(body)
            const u = await user.save()
            res.json({
                success : "Account Successfully Created! Login to continue."
            })
        } catch (error) {
            if(error.code === 11000){
                res.json({
                    notice : 'Email already exists! Please add another one.'
                })
            } else {
                res.json(error)
            }
        }  
    }
}

userController.login = async (req, res) => {
    const body = pick(req.body, ['email', 'password'])
    try {
        const user = await User.findOne({email : body.email})
        if(user){
            const match = await bcrypt.compare(body.password, user.password)
            if(match){
                try {
                    const u = await User.findByIdAndUpdate(user._id, {$inc : {loginCount : 1}})
                    const token = jwt.sign({_id : user._id, role : user.role}, process.env.JWT_SECRET_KEY, {expiresIn : "7d"})
                    res.json({
                        token : `Bearer ${token}`
                    })
                } catch (error) {
                    res.json(error)
                }
               
            } else {
                res.json({
                    notice : "Invalid email or password"
                })
            }
        } else {
            res.json({
                notice : "Invalid email or password"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

userController.loginCount = async (req, res) => {
    try {
        const user = await User.findById(req.tokenData._id)
        res.json({
            loginCount : user.loginCount
        })
    } catch (error) {
        res.json(error)
    }
}

userController.account = async (req, res) => {
    try {
        const user = await User.findById(req.tokenData._id)
        const userObj = JSON.parse(JSON.stringify(user))
        res.json(omit(userObj, ['password']))
    } catch (error) {
        res.json(error)
    }
}

userController.update = async (req, res) => {
    const body = pick(req.body, ['email','name','mobile','expertise','picture'])
    try {
        const user = await User.findByIdAndUpdate(req.tokenData._id, body, {new : true, runValidators : true})
        const userObj = JSON.parse(JSON.stringify(user))
        res.json(omit(userObj, ['password', 'loginCount']))
    } catch (error) {
        res.json(error)
    }
}

module.exports = userController