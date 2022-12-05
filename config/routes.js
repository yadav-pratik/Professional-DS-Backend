const express = require('express')

const userController = require('../app/controllers/userController')
const serviceController = require('../app/controllers/serviceController')

const authenticatUser = require('../app/middlewares/authentication')
const authorizeExpert = require('../app/middlewares/authorizeExpert')

const router = express.Router()

//user apis

router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/account', authenticatUser, userController.account)

//service apis

router.post('/api/service/create', authenticatUser, serviceController.create)
router.get('/api/service/customerList', authenticatUser, serviceController.customerList)
router.put('/api/service/customerUpdate/:id', authenticatUser, serviceController.customerUpdate)
router.delete('/api/service/customerDelete/:id', authenticatUser, serviceController.customerDelete)
router.get('/api/service/expertList', authenticatUser, authorizeExpert, serviceController.expertList)

module.exports = router