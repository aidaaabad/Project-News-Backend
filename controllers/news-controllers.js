const News=require('../model/news-model')
const { Helper } = require("../components/helper");;



exports.fetchAllNews=async(req,res)=>{
    const news = await News.find()
    res.status(200).json({news})
}


exports.addNews=async(req,res)=>{
   const {title,description,img} = req.body
   const news=new News({title,description})
   if(req.file){
      news.img=req.file.path
    }
   await news.save()
    res.status(201).json({news})
}

exports.getNewsById=async(req,res)=>{
    const newsId=req.params.nid
    const news = await News.findById(newsId)
    res.json({news})
}


exports.deleteNewsById=async(req,res)=>{
    const newsId=req.params.nid
    const news = await News.findOneAndDelete(newsId)
    res.json({message:"item is deleted!"})
}


exports.updateNewsById=async(req,res)=>{
    const newsId=req.params.nid;
   
    const updatedData={
        title:req.body.title,
        description:req.body.description,
    }

    if(req.file){
        updatedData.img=req.file.path

    }

    const news = await News.findByIdAndUpdate(newsId,updatedData)
    res.json({news})
}