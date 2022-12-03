const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator : (value) => {
                return isEmail(value)
            },
            message : () => {
                return 'Invalid Email Format'
            }
        },        
        unique : true,
    },
    password : {
        type : String,
        minLength : 8,
        maxLength : 128,
        required : true
    },
    mobile : {
        type : String,
        minLength : 10,
        maxLength : 10,
        required : true
    },
    role : {
        type : String,
        enum : ['customer','expert','admin'],
        default : 'customer',
    },
    expertise : {
        type : String,
        enum : ['painter','electrical','plumber','carpenter'],
    },
    address : {
        type : String,
        default : null
    },
    picture : {
        type : String
    }
},{timestamps : true})

userSchema.pre('save', async function(next){
    const user = this
    try {
        const salt = await bcrypt.genSalt(10)
        const encrypted = await bcrypt.hash(user.password, salt)
        user.password = encrypted
        next()
    } catch (error) {
        console.log(error)      //need to change this
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User