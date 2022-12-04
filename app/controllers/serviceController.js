const Service = require('../models/service')
const {pick} = require('lodash')

const serviceController = {}

serviceController.create = async (req, res) => {
    const body = pick(req.body, ['user', 'category', 'description', 'address', 'scheduledOn'])
    try {
        const service = new Service(body)
        const s = await service.save()
        res.json(s)
    } catch (error) {
        res.json(error)
    }
    

}

module.exports = serviceController