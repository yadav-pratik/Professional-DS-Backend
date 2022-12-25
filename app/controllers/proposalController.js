const Proposal = require('../models/proposal')
const { pick } = require('lodash')

const proposalController = {}

proposalController.create = async (req, res) => {
    const body = pick(req.body, ['serviceRequest', 'amount', 'date'])
    try {
        const proposal = new Proposal({...body, professional : req.tokenData._id})
        const p = await proposal.save()
        res.json(p)
    } catch (error) {
        res.json(error)
    }
}

proposalController.update = async (req, res) => {
    const body = pick(req.body, ['amount'])
    const id = req.params.id
    try {
        const proposal = await Proposal.findOneAndUpdate({_id : id, professional : req.tokenData._id}, body, {new : true})
        res.json(proposal)
    } catch (error) {
        res.json(error)
    }
}

proposalController.delete = async (req, res) => {
    const id = req.params.id
    try {
        const proposal = await Proposal.findOneAndDelete({_id : id, professional : req.tokenData._id})
        res.json(proposal)
    } catch (error) {
        res.json(error)
    }
}

proposalController.customerList = async (req, res) => {
    const sId = req.params.sId
    try {
        const proposals = await Proposal.find({serviceRequest : sId}).populate('professional')
        res.json(proposals)
    } catch (error) {
        res.json(error)
    }
}

proposalController.accept = async (req, res) => {
    const id = req.params.id
    try {
        const proposal = await Proposal.findByIdAndUpdate(id, {status : 'accepted'}, {new : true})
        const updateStatus = await Proposal.updateMany({_id : { $not : {$eq : id}}}, {status : 'rejected'})
        res.json(proposal)
    } catch (error) {
        res.json(error)
    }
}

proposalController.reject = async (req, res) => {
    const id = req.params.id
    try {
        const proposal = await Proposal.findByIdAndUpdate(id, {status : 'rejected'}, {new : true})
        res.json(proposal)
    } catch (error) {
        res.json(error)
    }
}


module.exports = proposalController