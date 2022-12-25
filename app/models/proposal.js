const mongoose = require('mongoose')

const Schema = mongoose.Schema

const proposalSchema = new Schema({
    professional : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    serviceRequest : {
        type : Schema.Types.ObjectId,
        ref : 'ServiceReques',
        required : true 
    },
    date : {
        type : Date,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['pending','accepted','rejected'],
        default : 'pending'
    }
})

const Proposal = mongoose.model('Proposal', proposalSchema)

module.exports = Proposal