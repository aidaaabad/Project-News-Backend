const User=require('../model/admin-model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.fetchAllUsers=async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({users})
}

exports.getUserById=async(req,res,next)=>{
    const userId=req.params.pid
    const user = await User.findById(userId)
    res.json({user})
}


exports.deleteUserById=async(req,res,next)=>{
    const userId=req.params.pid
    const user = await User.findOneAndDelete(userId)
    res.json({message:"item is deleted!"})
}


exports.updateUserById=async(req,res,next)=>{
    const userId=req.params.pid;
    const updatedData={
        fullName:req.body.fullName,
        userName:req.body.userName,
        password:req.body.password

    }
    if(updatedData.userName){
        const validUser=await User.findOne({userName:updatedData.userName})
        console.log('validUser',validUser)
        if(validUser){
         res.json({message:'UserName exit'})
        }
    }

    if(updatedData.password){
        const hashedPass=await bcrypt.hash(updatedData.password,12)
        updatedData.password=hashedPass;
        
    }

    const user = await User.findByIdAndUpdate(userId,updatedData)
    res.json({user})
}


exports.signup=async(req,res,next)=>{
    const {userName,password,fullName}=req.body
    const hashedPass=await bcrypt.hash(password,12)
    const user=new User({userName,password:hashedPass,fullName,LastLogin:Date.now()})
    await user.save()
    const token=jwt.sign({userName:user.userName},'secret_key')
    res.status(201).json({user,token})
}

exports.login=async(req,res,next)=>{
    const {userName,password}=req.body
   const validUser=await User.findOne({userName:userName})
   if(!validUser){
    res.json({message:'Invalid UserName'})
   }
   const validPassword=await bcrypt.compare(password,validUser.password)
   if(!validPassword){
    res.json({message:'Invalid Password'})
   }
   await User.findOneAndUpdate({userName:validUser.userName}, {lastLogin: Date.now()})
   const token=jwt.sign({userName:validUser.userName},'secret_key')
    res.status(200).json({token})
}