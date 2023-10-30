const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Models/token.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      let exitingToken = await BlacklistModel.find({
        blacklist: { $in: token },
      });

      if(exitingToken.length > 0){
        return res.status(400).send({"msg" :"please login again!!"})
      }

      let decoded = jwt.verify(token , "masai")
      req.body.userID = decoded.userID
      req.body.name = decoded.name
      return next();
    }
    else{
        res.status(400).send({"msg" :"Please login again!!"})
    }
  } catch (error) {
    res.status(400).send({"msg" :"Error while verifying"})
  }
};

module.exports={
    auth
}
