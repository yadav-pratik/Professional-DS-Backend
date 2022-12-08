const Address = require('../models/address')

const addressController = {}

addressController.create = async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const address = new Address(body)
        const a = await address.save()
        res.json(a)
    } catch (error) {
        res.json(error)
    }
}

addressController.list = async (req, res) => {
    try {
        const addresses = await Address.find({user : req.tokenData._id})
        res.json(addresses)
    } catch (error) {
        res.json(error)
    }
}

addressController.update = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const address = await Address.findOneAndUpdate({_id : id, user : req.tokenData._id}, body, {new : true})
        console.log(address)
        if(address){
            res.json(address)
        } else {
            res.json({
                notice : "Bad Request"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

addressController.delete = async (req, res) => {
    const id = req.params.id
    try {
        const address = await Address.findOneAndDelete({_id : id, user : req.tokenData._id})
        if(address){
            res.json(address)
        } else {
            res.json({
                notice : "Bad Request"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = addressController