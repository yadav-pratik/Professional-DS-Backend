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
        maxLength : 400,
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
        maxLength : 200
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
    acceptedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    // review : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Review'
    // }
}, {timestamps : true})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service