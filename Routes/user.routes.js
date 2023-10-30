const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Models/token.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, gender, password, age, city, is_married } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(200).semd({ 'msg': "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async(err, hash) => {
        if (err) {
          res.status(400).send({ "msg": "errror to hash the password" });
        } else {
          let newUser = await new UserModel(req.body);

          newUser.name = name;
          newUser.email = email;
          newUser.gender = gender;
          newUser.password = hash;
          newUser.gender = gender;
          newUser.age = age;
          newUser.city = city;
          newUser.is_married = is_married;
          await newUser.save();
          res
            .status(200)
            .send({ "msg": "user adde successfully", "user": req.body });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ "msg": "errror to register user" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: existingUser._id, name: existingUser.name },
            "masai"
          );
          res.status(200).send({ msg: "user loged in ", token: token });
        } else {
          res.status(400).send({ msg: "loged in failed" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error to log in" });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      await BlacklistModel.updateMany({}, { $push: { blacklist: [token] } });
      res.status(200).send({ msg: "Logout Successfully" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error to logout" });
  }
});

module.exports = {
  userRouter,
};
