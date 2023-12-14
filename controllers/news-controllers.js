const News = require("../model/news-model");
const { Helper } = require("../components/helper");
let ObjectId = require('mongoose').Types.ObjectId;
const validator=require('validator')
exports.fetchAllNews = async (req, res) => {
  const news = await News.find();
  res.status(200).json({ news });
};

exports.addNews = async (req, res) => {
  const { title, description, img } = req.body;


if(!title && !description){
   return res.status(400).json({ message:"there is no body" });
}


if(!title){
    return res.status(400).json({ message:"title is required" });
 }

 if(!description){
    return res.status(400).json({ message:"description is required" });
 }

  const news = new News({ title, description });
  if (req.file) {
    news.img = req.file.path;
  }
  await news.save();
  return res.status(201).json({ news });
};

exports.getNewsById = async (req, res) => {
  const newsId = req.params.nid;

  if(!ObjectId.isValid(newsId)){
    return res.status(400).json({ message:'Id is not valid!' });
  }
   const validNews = await News.findById(newsId);
  if(!validNews){
    return res.status(400).json({ message:'Id not found!' });
  }
  return res.json({ validNews });
};

exports.deleteNewsById = async (req, res) => {
  const newsId = req.params.nid;

  await validNews.deleteOne();
  return res.json({ message: "item is deleted!" });
};

exports.updateNewsById = async (req, res) => {
  const newsId = req.params.nid;
  if(!ObjectId.isValid(newsId)){
    return res.status(400).json({ message:'Id is not valid!' });
  }
  const validNews = await News.findById(newsId);
  if(!validNews){
    return res.status(400).json({ message:'Id not found!' });
  }
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
  };

  if (!req.file && !updatedData.title && !updatedData.description) {
    return res.status(400).json({ message:'There is no body' });
  }

  if(!updatedData.title){
    updatedData.title=validNews.title
}

if(!updatedData.description){
    updatedData.description=validNews.description
}
 if( validator.isEmpty(updatedData.title)){
    return res.status(400).json({ message:'Title  is required' });
 }
 
 if( validator.isEmpty(updatedData.description)){
    return res.status(400).json({ message:'Description  is required' });
 }



  if (req.file) {
    updatedData.img = req.file.path;
  }

  const news = await News.findByIdAndUpdate(newsId, updatedData);
  return res.json({ news });
};
