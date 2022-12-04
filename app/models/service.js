const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description : {
        type : String,
        maxLength : 800,
        required : true
    },
    category : {
        type : String,
        enum : ['painter','electrician','carpenter','plumber'],
        required : true
    },
    scheduledOn : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true,
        maxLength : 400
    },
    billAmount : {
        type : Number
    },
    status : {
        type : String,
        enum : ['added', 'accepted', 'completed'],
        default : 'added'
    },
    acceptedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service