const Address = require('../models/address')

const addressCheck = async (req, res, next) => {
    try {
        const addresses = await Address.find({user : req.tokenData._id})
        if(req.tokenData.role === 'customer'){
            if(addresses.length < 3){
                next()
            } else {
                res.json({
                    notice : "Customer can only add upto 3 addresses"
                })
            }
        } else if(req.tokenData.role === 'professional'){
            if(addresses.length < 1){
                next()
            } else {
                res.json({
                    notice : "Professional can only 1 address"
                })
            }
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = addressCheck