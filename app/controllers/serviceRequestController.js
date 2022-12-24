const ServiceRequest = require('../models/serviceRequest')
const { pick } = require('lodash')

const serviceRequestController = {}

//for customers

serviceRequestController.create = async (req, res) => {
    const body = pick(req.body, ['category', 'description','picture', 'address'])
    try {
        const service = new ServiceRequest({...body, user : req.tokenData._id})
        const s = await service.save()
        res.json(s)
    } catch (error) {
        res.json(error)
    }
}

serviceRequestController.customerList = async (req, res) => {
    const status = req.query.status
    let services
    try {
        if(status === 'all'){
            services = await ServiceRequest.find({user : req.tokenData._id}).populate('address').sort({createdAt : -1})
        } else {
            services = await ServiceRequest.find({user : req.tokenData._id, status : status}).populate('address').sort({createdAt : -1})
        }
        res.json(services)
    } catch (error) {
        res.json(error)
    }
}

serviceRequestController.update = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const service = await ServiceRequest.findOneAndUpdate({_id : id, user : req.tokenData._id}, body, {new : true, runValidators : true}).populate('address')
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

serviceRequestController.delete = async (req, res) => {
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

serviceRequestController.allot = async (req, res) => {
    const professional = req.body.professional
    const id = req.params.id
    try {
        const service = await ServiceRequest.findOneAndUpdate({_id : id, user : req.tokenData._id}, {status : 'alloted', professional}, {new : true})
        res.json(service)
    } catch (error) {
        res.json(error)        
    }
}

serviceRequestController.complete = async (req, res) => {
    const billAmount = req.body.billAmount
    const id = req.params.id
    try {
        const service = await ServiceRequest.findOneAndUpdate({_id : id, professional : req.tokenData._id}, {status : 'completed', billAmount}, {new : true})
        if(service){
            res.json(service)
        } else {
            res.json({
                notice : "Bad Request"
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
            const services = await ServiceRequest.find({professional : req.tokenData._id, status : query.filterBy})
            res.json(services)
        } catch (error) {
            res.json(error)            
        }
    }
}

module.exports = serviceRequestController