const express=require('express')
const router=express.Router()
const userController=require('../controllers/user-controllers')
const auth=require('../middleware/auth')


router.post('/signup',userController.signup)
router.post('/login',userController.login)

router.use(auth)
router.get('/fetchUsers',userController.fetchAllUsers)
router.get('/:pid',userController.getUserById)
router.delete('/:pid',userController.deleteUserById)
router.put('/:pid',userController.updateUserById)

module.exports=router


