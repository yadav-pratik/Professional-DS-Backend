const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name : {
        type : String,
        requires : true,
        enum : ['electrician','plumber','painter','carpenter']
    }
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category