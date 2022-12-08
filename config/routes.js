const express = require('express')

const userController = require('../app/controllers/userController')
const serviceRequestController = require('../app/controllers/serviceRequestController')
const reviewController = require('../app/controllers/reviewController')
const proposalController = require('../app/controllers/proposalController')

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
router.get('/api/service-request/customer-list', authenticatUser, serviceRequestController.customerList)
router.put('/api/service-request/customer-update/:id', authenticatUser, serviceRequestController.customerUpdate)
router.delete('/api/service-request/customer-delete/:id', authenticatUser, serviceRequestController.customerDelete)
router.get('/api/service-request/professional-list', authenticatUser, authorizeProfessional, serviceRequestController.professionalList)
// router.put('/api/service-request/expertUpdate/:id', authenticatUser, authorizeProfessional, serviceRequestController.professionalUpdate)

//proposal apis

router.post('/api/proposal/create', authenticatUser, authorizeProfessional, proposalController.create)
router.put('/api/proposal/update/:id', authenticatUser, authorizeProfessional, proposalController.update)
router.delete('/api/proposal/delete/:id', authenticatUser, authorizeProfessional, proposalController.delete)
router.get('/api/proposal/customer-list/:sId', authenticatUser, proposalController.customerList)
router.put('/api/proposal/accept/:id', authenticatUser, proposalController.accept)
router.put('/api/proposal/reject/:id', authenticatUser, proposalController.reject)

//review apis

router.post('/api/review/create', authenticatUser, reviewController.create)
// router.get('/api/review/userList', authenticatUser, reviewController.userList)
router.get('/api/review/professional-list', authenticatUser, authorizeProfessional, reviewController.professionalList)

//

module.exports = router