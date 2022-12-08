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