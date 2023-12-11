const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    fullName:{type:String,require:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
    token:{type:String,required:true},
    LastLogin: {type: Date, default: Date.now  }
})

module.exports=mongoose.model('User',userSchema)