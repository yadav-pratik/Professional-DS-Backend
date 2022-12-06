const ServiceRequest = require('../models/serviceRequest')
const { pick } = require('lodash')

const serviceRequestController = {}

//for customers

serviceRequestController.create = async (req, res) => {
    const body = pick(req.body, ['category', 'description', 'dateTime','picture'])
    try {
        const service = new ServiceRequest({...body, user : req.tokenData._id})
        const s = await service.save()
        res.json(s)
    } catch (error) {
        res.json(error)
    }
}

serviceRequestController.customerList = async (req, res) => {
    try {
        const services = await ServiceRequest.find({user : req.tokenData._id})
        res.json(services)
    } catch (error) {
        res.json(error)
    }
}

serviceRequestController.customerUpdate = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const service = await ServiceRequest.findOneAndUpdate({_id : id, user : req.tokenData._id}, body, {new : true, runValidators : true})
        if(service){
            res.json(service)
        } else {
            res.json({
                notice : 'Bad request'          //if no service is found null is returned. this is to avoid it
            })
        }
    } catch (error) {
        res.json(error)
    }
}

serviceRequestController.customerDelete = async (req, res) => {
    const id = req.params.id
    try {
        const service = await ServiceRequest.findOneAndDelete({_id : id, user : req.tokenData._id})
        if(service){
            res.json(service)
        } else {
            res.json({
                notice : 'Bad request'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

//for experts

serviceRequestController.professionalList =  async (req, res) => {
    const query = req.query
    if(query.category){
        try {
            const services = await ServiceRequest.find({category : query.category, status : 'added'})
            res.json(services)
        } catch (error) {
            res.json(error)            
        }
    } else if(query.filterBy){
        try {
            const services = await ServiceRequest.find({acceptedBy : req.tokenData._id, status : query.filterBy})
            res.json(services)
        } catch (error) {
            res.json(error)            
        }
    }
}

serviceRequestController.professionalUpdate = async (req, res) => {
    const id = req.params.id
    const query = req.query
    const billAmount = req.body.billAmount
    try {
    const service = await ServiceRequest.findOneAndUpdate({_id : id, acceptedBy : req.tokenData._id}, {status : query.status, acceptedBy : req.tokenData._id, billAmount}, {new : true})
    if(service) {
        res.json(service)
    } else {
        res.json({
            notice : "Bad request"
        })
    }
    } catch (error) {
        res.json(error)
    }
}    


module.exports = serviceRequestController