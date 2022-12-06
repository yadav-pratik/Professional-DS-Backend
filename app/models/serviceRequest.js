const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceRequestSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description : {
        type : String,
        maxLength : 400,
        required : true
    },
    category : {
        type : String,
        enum : ['painter','electrician','carpenter','plumber'],
        required : true
    },
    dateTime : {
        type : Date,
        required : true
    },
    billAmount : {
        type : Number,
        default : 0
    },
    status : {
        type : String,
        enum : ['added', 'accepted', 'completed'],
        default : 'added'
    },
    professional : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    picture : {
        type : String
    }
}, {timestamps : true})

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema)

module.exports = ServiceRequest