const express = require("express");
const UserModel = require("../model/userregister.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
  const { name, email, pass,rollno} = req.body;


    try {
      bcrypt.hash(pass, 5, async (err, security) => {
        if (err) {
          console.log(err);
        } else {;
          const user = new UserModel({
            email,
            pass: security
          });
          
          await user.save();
          res.json(user)
        }
      });
    } catch (error) {
      res.send({ message: "error in registering the user" });
 
    }
  
});

userRouter.post("/login", async (req, res) => {
    let { email, pass } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(pass, user.pass, (err, result) => {
          if (result) {
            let token = jwt.sign({ authorId: user._id },process.env.key);
            res.send({ msg:  "Login Successful", token: token });
          } else {
            res.send({ msg: "Invalid Credentials ,please Login Again" });
          }
        });
      } else {
        res.send({ msg: "please signup first and proceed" });
      }
    } catch (error) {
      res.send(error);
    }
  });

module.exports = {
  userRouter,
};





