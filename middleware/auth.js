const jwt=require('jsonwebtoken')
require('dotenv').config();
const { SECRETKEY} = process.env;
const { Helper } = require("../components/helper");


module.exports=async(req,res,next)=>{

    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0].toLocaleLowerCase() === "bearer"
      ) {
        try {
            const token=req.headers.authorization.split(' ')[1];
            const decodedToken=jwt.verify(token,SECRETKEY)
            // console.log("decode",decodedToken)
            req.userData={id:decodedToken._id}
            next();
        } catch (error) {
          req.user = undefined;
          return res.status(401).json({ message:"Auth Error" });
        }
      } else {
        req.user = undefined;
        return res.status(401).json({ message:"Auth Error" });
      }






}