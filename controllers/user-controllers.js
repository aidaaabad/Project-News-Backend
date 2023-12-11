const User=require('../model/user-model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { Helper } = require("../components/helper");
exports.fetchAllUsers=async(req,res)=>{
    const users = await User.find()
    res.status(200).json({users})
}

exports.getUserById=async(req,res)=>{
    const userId=req.params.pid
    const user = await User.findById(userId)
    res.json({user})
}


exports.deleteUserById=async(req,res)=>{
    const userId=req.params.pid
    const user = await User.findOneAndDelete(userId)
    res.json({message:"item is deleted!"})
}


exports.updateUserById=async(req,res)=>{
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
         return
        }
    }

    if(updatedData.password){
        const hashedPass=await Helper.Hash(updatedData.password)
        updatedData.password=hashedPass;
        
    }

    const user = await User.findByIdAndUpdate(userId,updatedData)
    res.json({user})
}


exports.signup=async(req,res)=>{
    const {userName,password,fullName}=req.body
    const hashedPass=await Helper.Hash(password)
    const user=new User({userName,password:hashedPass,fullName,LastLogin:Date.now()})

    if(user.userName){
        const validUser=await User.findOne({userName:user.userName})
        if(validUser){
         res.json({message:'UserName exit'})
         return
        }
    }

    await user.save()
    const token=await Helper.GenerateToken(user)
    res.status(201).json({user,token})
}

exports.login=async(req,res)=>{
    const {userName,password}=req.body
   const validUser=await User.findOne({userName:userName})
   if(!validUser){
    res.json({message:'Invalid UserName'})
    return
   }
   const validPassword=await Helper.Compare(password,validUser.password)
   if(!validPassword){
    res.json({message:'Invalid Password'})
    return
   }
   await User.findOneAndUpdate({userName:validUser.userName}, {lastLogin: Date.now()})
   const token=await Helper.GenerateToken(validUser)
    res.status(200).json({token})
}