const express=require('express')
const app=express()
const mongoose=require('mongoose')
const userRoutes=require('./routes/user-routers')
const homeRoutes=require('./routes/home-routers')
require('dotenv').config();
const { PORT, MONGO_DB, MONGO_PORT,MONGO_HOSTNAME } = process.env;



app.use(express.json())
app.use('/api/admin',userRoutes)
app.use("/", homeRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`).then(()=>{
    app.listen(PORT)
}).catch((err)=>{
    console.log(err)
    throw err
})