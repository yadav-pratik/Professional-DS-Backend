const express = require('express')

const userController = require('../app/controllers/userController')
const addressController = require('../app/controllers/addressController')
const serviceRequestController = require('../app/controllers/serviceRequestController')
const reviewController = require('../app/controllers/reviewController')
const proposalController = require('../app/controllers/proposalController')

const authenticateUser = require('../app/middlewares/authentication')
const authorizeProfessional = require('../app/middlewares/authorizeProfessional')
const addressCheck = require('../app/middlewares/addressCheck')

const router = express.Router()

//user apis

router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/loginCount', authenticateUser, userController.loginCount)
router.get('/api/user/account', authenticateUser, userController.account)
router.put('/api/user/update', authenticateUser, userController.update)

//address apis

router.post('/api/address/create', authenticateUser, addressCheck, addressController.create)
router.get('/api/address/list', authenticateUser, addressController.list)
router.put('/api/address/update/:id', authenticateUser, addressController.update)
router.delete('/api/address/delete/:id', authenticateUser, addressController.delete)

//service Request apis

router.post('/api/service-request/create', authenticateUser, serviceRequestController.create)
router.get('/api/service-request/customer-list', authenticateUser, serviceRequestController.customerList)
router.put('/api/service-request/update/:id', authenticateUser, serviceRequestController.update)
router.delete('/api/service-request/delete/:id', authenticateUser, serviceRequestController.delete)
router.put('/api/service-request/allot/:id',  authenticateUser, serviceRequestController.allot)
router.put('/api/service-request/complete/:id',  authenticateUser, authorizeProfessional, serviceRequestController.complete)
router.get('/api/service-request/professional-list', authenticateUser, authorizeProfessional, serviceRequestController.professionalList)

//proposal apis

router.post('/api/proposal/create', authenticateUser, authorizeProfessional, proposalController.create)
router.put('/api/proposal/update/:id', authenticateUser, authorizeProfessional, proposalController.update)
router.delete('/api/proposal/delete/:id', authenticateUser, authorizeProfessional, proposalController.delete)
router.get('/api/proposal/customer-list/:sId', authenticateUser, proposalController.customerList)
router.put('/api/proposal/accept/:id', authenticateUser, proposalController.accept)
router.put('/api/proposal/reject/:id', authenticateUser, proposalController.reject)

//review apis

router.post('/api/review/create', authenticateUser, reviewController.create)
// router.get('/api/review/userList', authenticateUser, reviewController.userList)
router.get('/api/review/professional-list', authenticateUser, authorizeProfessional, reviewController.professionalList)

//

module.exports = router