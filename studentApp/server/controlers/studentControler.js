const express = require('express');
const { ObjectId } = require('mongodb');
const studentModele = require('../models/studentModel')

exports.getAllStd = async(req, res)=>{
    try{
    const response = await studentModele.find({});
    res.json({success:1 ,data:response});  
    }catch(e){
    res.json({success:0 ,error:"Cannot get List of Student"}); 
    }
    
};

exports.getStdById = async(req, res)=>{
    try{
        const response = await studentModele.findById(req.params.std_id);
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:"Cannot get  Student"}); 
        }
};

exports.addStd = async(req, res)=>{
    try{
        const response = await new studentModele(req.body).save();
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:"Cannot get List of Students"}); 
        }
}

exports.updateStd = async(req, res)=>{
    try{
        const {email, first_name, last_name, avatar} = req.body;
        const response = await studentModele.updateOne(
        {_id: new ObjectId(req.params.std_id)}, 
        {$set:{email, first_name, last_name, avatar}});
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:"Cannot save changes"}); 
        }
};
exports.deleteStd = async(req, res)=>{
    try{
        const response = await studentModele.deleteOne({_id:new ObjectId(req.params.std_id) });
        res.json({success:1 ,data:response});  
        }catch(e){
        res.json({success:0 ,error:e.message}); 
        }
};