const authorizeExpert = (req, res, next) => {
    if(req.tokenData.role ===  'professional'){
        next()
    } else {
        res.json({
            notice : 'You should be an Expert to access the route'
        })
    }
}

module.exports = authorizeExpert