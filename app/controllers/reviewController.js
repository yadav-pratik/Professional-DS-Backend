const Review = require('../models/review')

const reviewController = {}

//for customer

reviewController.create = async (req, res) => {
    const body = req.body
    try {
        const review = new Review({...body, user : req.tokenData._id})
        const r = await review.save()
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

reviewController.userList = async (req, res) => {
    try {
        const reviews = await Review.find({user : req.tokenData._id})
        res.json(review)
    } catch (error) {
        res.json(error)
    }
}

//for expert

reviewController.expertList = async (req, res) => {
    try {
        const reviews = await Review.find({expert : req.tokenData._id})
        res.json(reviews)
    } catch (error) {
        res.json(error)
    }
}

module.exports = reviewController