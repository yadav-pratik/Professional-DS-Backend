const mongoose = require('mongoose')

const Schema = mongoose.Schema

const proposalSchema = new Schema({
    professional : {
        type : Schema.Types.ObjectId,
        required : true
    },
    serviceRequest : {
        type : Schema.Types.ObjectId,
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