const express=require('express')
const app=express()
const mongoose=require('mongoose')
const adminRoutes=require('./routes/admin-routers')
app.use(express.json())
app.use('/api/admin',adminRoutes)



mongoose.connect('mongodb://127.0.0.1:27017/news').then(()=>{
    app.listen(8000)
}).catch((err)=>{
    console.log(err)
    throw err
})