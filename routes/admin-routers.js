const express=require('express')
const router=express.Router()
const adminController=require('../controllers/admin-controllers')
router.get('/fetchUsers',adminController.fetchAllUsers)
router.get('/:pid',adminController.getUserById)
router.delete('/:pid',adminController.deleteUserById)
router.put('/:pid',adminController.updateUserById)
router.post('/signup',adminController.signup)
router.post('/login',adminController.login)
module.exports=router


