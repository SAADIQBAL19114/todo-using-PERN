const { todo, users } = require("../sequelize/models");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const handleRegisterUser = async(req,res) => {
    const { name, username, email, password, gender, dob, role } =
      req.body;
    try {
      userAlreadyExist = await users.findOne({ where: {email} });
      if (userAlreadyExist) {
        return res.status(400).json({
          message: "User Already Exist",
        });
      }
     const newDob = new Date(dob);
     const currentDate = new Date();
     const age = currentDate.getFullYear() - newDob.getFullYear();

      const hash = await bcrypt.hash(password, 10);
      const user = await users.create({
        name,
        username,
        email,
        password: hash,
        gender,
        dob,
        age,
        role,
      });
      res.status(201).json({
        message: "User Registered",
        data: user,
        // token:token,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
}

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Email or Password doesnot match",
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Password does not match",
      });
    } 
    const token = jwt.sign(
        { id: user.id },
        "secretkey");

      // cookie section
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        message: "user has been logged in",
        token: token,
        user:user,
      });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}; 

module.exports = {
  handleRegisterUser,
  handleLoginUser,
};