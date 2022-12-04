const Service = require('../models/service')
const {pick} = require('lodash')

const serviceController = {}

serviceController.create = async (req, res) => {
    const body = pick(req.body, ['category', 'description', 'address', 'scheduledOn'])
    try {
        const service = new Service({...body, user : req.tokenData._id})
        const s = await service.save()
        res.json(s)
    } catch (error) {
        res.json(error)
    }
}

serviceController.list = async (req, res) => {
    const query = req.query
    if(query.user === 'customer'){
        try {
            const services = await Service.find({user : req.tokenData._id})
            res.json(services)
        } catch (error) {
            res.json(error)
        }
    } else if(query.user === 'expert'){
        try {
            const services = await Service.find({category : query.category, status : 'added'})
            res.json(services)
        } catch (error) {
            res.json(error)            
        }
    }
}

module.exports = serviceController