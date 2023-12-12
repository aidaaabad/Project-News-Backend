const mongoose=require('mongoose')
const Schema=mongoose.Schema
const newsSchema=new Schema({
    title:{type:String,require:true},
    description:{type:String,required:true},
    img: {type:String}
})

module.exports=mongoose.model('News',newsSchema)