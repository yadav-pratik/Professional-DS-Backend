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
        enum : ['painting','electrical','carpentry','plumbing'],
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
    isCompleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service