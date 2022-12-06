const express = require('express')

const userController = require('../app/controllers/userController')
const serviceRequestController = require('../app/controllers/serviceRequestController')
const reviewController = require('../app/controllers/reviewController')

const authenticatUser = require('../app/middlewares/authentication')
const authorizeProfessional = require('../app/middlewares/authorizeProfessional')

const router = express.Router()

//user apis

router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/loginCount', authenticatUser, userController.loginCount)
router.get('/api/user/account', authenticatUser, userController.account)

//service Request apis

router.post('/api/service-request/create', authenticatUser, serviceRequestController.create)
router.get('/api/service-request/customerList', authenticatUser, serviceRequestController.customerList)
router.put('/api/service-request/customerUpdate/:id', authenticatUser, serviceRequestController.customerUpdate)
router.delete('/api/service-request/customerDelete/:id', authenticatUser, serviceRequestController.customerDelete)
router.get('/api/service-request/professionalList', authenticatUser, authorizeProfessional, serviceRequestController.professionalList)
router.put('/api/service-request/expertUpdate/:id', authenticatUser, authorizeProfessional, serviceRequestController.professionalUpdate)

//review apis

router.post('/api/review/create', authenticatUser, reviewController.create)
router.get('/api/review/userList', authenticatUser, reviewController.userList)
router.get('/api/review/expertList', authenticatUser, reviewController.expertList)

module.exports = router