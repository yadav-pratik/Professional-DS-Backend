const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')

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
        }        
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
        required : true
    },
    expertise : {
        type : String,
        enum : ['painter','electrical','plumber','carpenter'],
        default : null
    },
    address : {
        type : String,
        default : null
    },
    picture : {
        type : String
    }
},{timestamps : true})

const User = mongoose.model('User', userSchema)

module.exports = User