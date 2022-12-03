const User = require('../models/user')
const { pick } = require('lodash')

const userController = {}

userController.register = async (req, res) => {
    const body = pick(req.body, ['email','password','name','mobile','role','expertise','address','picture'])
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

module.exports = userController