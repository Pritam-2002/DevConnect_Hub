const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {jwtAuthMiddleware, generateToken}= require('../auth/jwt');

router.post('/signup', async(req,res)=>{
    try{
        const data = req.body //assuming the request body contains the person data

        //create a new person
        const newUser= new User(data);
        
        //save the new person to databse
        const response=await newUser.save({data});
        console.log('data saved');

        const payload={
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload)
        console.log("Token is : ", token);

        res.status(200).json({message:"signup succesfully",result: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email:email});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid email or password'})
        }
        console.log("login successful")
        //generate token
        const payload={
            id:user.id
        }
        const token=generateToken(payload)

        res.status(200).json({message:"Login Successful",token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/profile', jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData=req.user;
        const userId=userData.id.id;
        const user=await User.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'}); 
    }
})

router.put('/profile/changepassword',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userId=req.user.id.id;
        //extract current and newpassword from req body
        const{currentPassword,newPassword}=req.body

        //find the user by user id
        const user=await User.findById(userId);

        //if password doesnot match
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:'Invalid username or password'})
        }
        //UPDATE THE USER PASSWORD
        user.password=newPassword;
        await user.save();
        return res.status(200).json({message:"Password Updated"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error!'})
        
    }
})

module.exports = router;