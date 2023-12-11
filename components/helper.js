const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { SECRETKEY} = process.env;
class Helper {

    static async Hash(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }
      static async Compare(password, Hash) {
        return await bcrypt.compare(password, Hash);
      }

      static async GenerateToken(user) {
        const token = jwt.sign({userName: user.userName ,expiresIn: "10h"},SECRETKEY);
        user.lastLoginAt = Date.now();
        await user.save();
        return token;
      }
// please read this line for compare token to token in db
      static async TokenVerify(token,user) {
        try {
          const decode = await jwt.verify(token, key);
          const validUser=await user.findOne({userName:user.userName})
          if (!validUser || validUser.token != token) throw false;
          delete validUser.token;
          return validUser;
        } catch (e) {
          throw false;
        }
      }



}

module.exports={Helper}