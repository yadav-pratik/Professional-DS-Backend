const Review = require('../models/review')

const reviewController = {}

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

module.exports = reviewController