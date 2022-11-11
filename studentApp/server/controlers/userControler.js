const express = require('express')
const userModele = require('../models/usersModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUser = async(req, res)=>{
    try{
        const response = await userModele.findById(req.params.user_id);
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:"Cannot get  Student"}); 
        }
};

exports.addUser = async(req, res)=>{
    try{
        const user = req.body;
        user.password = bcrypt.hashSync(user.password , saltRounds)
        const response = await new userModele(user).save();
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:"Cannot get List of Students"}); 
        }
};