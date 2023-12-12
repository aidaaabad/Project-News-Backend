const express=require('express')
const router=express.Router()
const newsController=require('../controllers/news-controllers')
const auth=require('../middleware/auth')
const upload=require('../middleware/upload')
router.use(auth)
router.get('/fetchNews',newsController.fetchAllNews)
router.post('/addNews',upload.single('img'),newsController.addNews)
router.get('/:nid',newsController.getNewsById)
router.delete('/:nid',newsController.deleteNewsById)
router.put('/:nid',upload.single('img'),newsController.updateNewsById)

module.exports=router


