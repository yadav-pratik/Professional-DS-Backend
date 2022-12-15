const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    doorNumber : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    street : {
        type : String
    },
    landmark : {
        type : String
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    }
}, {timestamps : true})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address