const express = require("express");
const userModele = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const PRIVATE_KEY = "CS569-2022-11";
exports.getUser = async (req, res) => {
  try {
    const user = req.body;
    const response = await userModele.findById({ email: user.email });
    res.json({ success: 1, data: response });
  } catch (e) {
    res.json({ success: 0, error: "Cannot get  Student" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.file);
    const { email, password } = req.body;
    const user = await userModele.findOne({ email });
    if (user) {
        const match = bcrypt.compareSync(password, user.password)
        
      if (match) {
        
       const tokenHash = jwt.sign({email, fullname: user.fullname}, PRIVATE_KEY);
        res.json({ success: 1, data: tokenHash});
        
      } else {
        res.json({ success: 0, error: "Wrong Password" });
      }
    } else {
      res.json({ success: 0, error: "User not found" });
    }
  } catch (e) {
    res.json({ success: 0, error: e.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    
    const find = await userModele.findOne({ email: req.body.email });
   
    if (!find) {
      user.password = bcrypt.hashSync(user.password, saltRounds);
      const response = await new userModele({...user, avatar:req.filename}).save();
      
      res.json({ success: 1, data: response });
    } else {
      res.json({ success: 0, error: "User already exist" });
    }
  } catch (e) {
    res.json({ success: 0, error: "Cannot get List of Students" });
  }
};
