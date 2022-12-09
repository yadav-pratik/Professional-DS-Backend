const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    serviceRequest : {
        type : Schema.Types.ObjectId,
        ref : 'ServiceRequest'
    },
    customer : {
       user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
       },
       rating : {
        type : Number
       },
       review : {
        type : String
       }
    },
    professional : {
       user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
       },
       rating : {
        type : Number
       },
       review : {
        type : String
       }
    },
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review