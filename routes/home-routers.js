const express=require('express')
const router=express.Router()

router.use('/', (req, res) => {
    res.send('root project')
});

module.exports=router