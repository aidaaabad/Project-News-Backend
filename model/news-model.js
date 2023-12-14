const mongoose=require('mongoose')

const Schema=mongoose.Schema
const newsSchema=new Schema({
    title:{type:String,require:[true, "title is a required field"]},
    description:{type:String,required:[true, "description is a required field"]},
    img: {type:String}
})

module.exports=mongoose.model('News',newsSchema)