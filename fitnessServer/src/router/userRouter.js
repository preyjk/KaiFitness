
const express = require("express");
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const sercetKey = require("../secret.js");

const User = require("../db/user")
const userRouter = express.Router()
userRouter.post("/signUp",(req,res) =>{
    try{
        const user = new User({
            user : req.body.user,
            password : md5(req.body.password),
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight,
            profilePicBase64: req.body.profilePicBase64
        })
        user.save().then(() =>{
            res.status(200).send(user._id)
        });
    }
    catch(e){
        res.status(500).send(e)
    }
})


userRouter.get("/signIn",async function(req,res){
    try{
        let user = await User.findOne({user : req.query["user"]})
        console.log(user)
        if(user === null){
            res.status(400).json({"message":"password or username error!"})
        }
        let flag = md5(req.query["password"]) === user.password
        if(flag){
            let token = 'Bearer ' + jwt.sign(
                {
                _id: user._id,
                },
                sercetKey,
                {
                expiresIn: 3600 * 24 * 3
                }
            )
            res.status(200).json({
                status: 'ok',
                data: { 
                    token: token,
                    uuid: user._id
                 }
            })
        }else{
            res.status(400).json({"message":"password or username error!"})
        }
    }
    catch(e){
        res.status(500).send(e)
    }
})



module.exports = userRouter;

