const Review = require('../models/review')
const { pick, omit } = require('lodash')

const reviewController = {}

//for customer

reviewController.create = async (req, res) => {
    const body = pick(req.body, ['serviceRequest', 'customer', 'professional'])
    try {
        const review = new Review({ ...body })
        const r = await review.save()
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

reviewController.customerReview = async (req, res) => {
    const body = pick(req.body, ['serviceRequest', 'customer'])
    try {
        const review = await Review.findOneAndUpdate({serviceRequest : body.serviceRequest, 'professional.user' : req.tokenData._id}, body, {new : true})
        const r = JSON.parse(JSON.stringify(review))
        res.json(omit(r, ['professional']))
    } catch (error) {
        res.json(error)
    }
}

reviewController.professionalReview = async (req, res) => {
    const body = pick(req.body, ['serviceRequest', 'professional'])
    try {
        const review = await Review.findOneAndUpdate({serviceRequest : body.serviceRequest, 'customer.user' : req.tokenData._id}, body, {new : true})
        const r = JSON.parse(JSON.stringify(review))
        res.json(omit(r, ['customer']))
    } catch (error) {
        res.json(error)
    }
}

reviewController.userList = async (req, res) => {
    try {
        const reviews = await Review.find({customer : {user : req.tokenData._id}})
        res.json(reviews)
    } catch (error) {
        res.json(error)
    }
}

//for expert

reviewController.professionalList = async (req, res) => {
    try {
        const reviews = await Review.find({professional : {user : req.tokenData._id}})
        console.log(req.tokenData._id)
        console.log(reviews)
        res.json(reviews)
    } catch (error) {
        res.json(error)
    }
}

module.exports = reviewController