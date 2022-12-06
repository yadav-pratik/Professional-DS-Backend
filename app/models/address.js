const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    doorNumber : {
        type : String
    },
    area : {
        type : String
    },
    street : {
        type : String
    },
    landmark : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    pincode : {
        type : String
    }
}, {timestamps : true})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address