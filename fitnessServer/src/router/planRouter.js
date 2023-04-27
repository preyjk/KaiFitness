
const express = require("express");
const User = require("../db/user")
const Plan = require("../db/plan")

const planRouter = express.Router()

planRouter.get("/planList",(req,res) =>{
    let tag = req.param("tag")
    let pageNo = Number(req.param("pageNo"))
    let pageSize = 20;
    Plan.find({tag:tag}).sort({name:1}).skip(pageNo * pageSize).limit(20).then((data) =>{
        res.status(200).json(data)
    })
})

planRouter.get("/personal/planDetail",(req,res) =>{
    let id = req.param("templateId")
    Plan.findById(id)
    .findOne()
    .populate("muscleGroup.muscle")
    .populate("dietGroup.diet")
    .then((data) =>{
        var returnData = {}
        returnData.templateId = data._id
        returnData.type = data.type
        returnData.name = data.name
        returnData.imagUrl = data.imagUrl
        returnData.information = data.information
        returnData.detail = data.detail
        var group = []
        data.muscleGroup.forEach(item =>{
            var itemGroup = {}
            itemGroup.name = item.muscle.name
            itemGroup.id = item.muscle._id
            itemGroup.number = item.number
            itemGroup.weight = item.weight
            itemGroup.calore = item.calore
            group.push(itemGroup)
        })
        data.dietGroup.forEach(item =>{
            var itemGroup = {}
            itemGroup.name = item.muscle.name
            itemGroup.id = item.muscle._id
            itemGroup.weight = item.weight
            itemGroup.calore = item.calore
            group.push(itemGroup)
        })
        returnData.group = group
        res.status(200).json(returnData)
    })
})

planRouter.post("/personal/AddPlan",(req,res) =>{
    const muscleGroup = []
    const dietGroup = []
    if(req.body.type === "diet"){
        dietGroup = req.body.Group
    }else{
        muscleGroup = req.body.Group
    }
    const plan = new Plan({
        type:req.body.type,
        name:req.body.name,
        imagUrl:req.body.imagBase64,
        information:req.body.information,
        detail:req.body.detail,
        owner:req.body.uuid,
        dietGroup:dietGroup,
        muscleGroup:muscleGroup
    })
    plan.save().then(()=>{
        res.status(200).send("succeed")
    })
})


planRouter.get("/personal/dashboard",(req,res) =>{
    var inClorie = 0;
    var outClorie = 0;
    var totalClorie = 0;
    req.param("templateId").forEach((id) =>{
        Plan.findById(id)
        .findOne()
        .populate("muscleGroup.muscle")
        .populate("dietGroup.diet")
        .then((data) => {
            if(data.type === "diet"){
                data.dietGroup.forEach(item =>{
                    inClorie = inClorie + item.weight * item.calore
                })
            }else{
                data.muscleGroup.forEach(item =>{
                    outClorie = outClorie + item.weight * item.calore * item.number
                })
            }
        })
    totalClorie = inClorie + outClorie
    res.status(200).json({
        totalCalorie:totalCalorie,
        inCalorie:inCalorie,
        outCalorie:outCalorie
    })
    })
})

module.exports=planRouter
    