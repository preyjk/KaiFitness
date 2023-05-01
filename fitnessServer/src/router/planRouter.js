
const express = require("express");
const User = require("../db/user")
const Plan = require("../db/plan")
const Muscle = require("../db/muscle")
const Diet = require("../db/diet")

const planRouter = express.Router()

planRouter.get("/planList",(req,res) =>{
    let tag = req.query["tag"]
    console.log(tag)
    let pageNo = Number(req.query["pageNo"])
    console.log(pageNo)
    let pageSize = 20;
    Plan.find({type:tag}).sort("name").skip(pageNo*pageSize).limit(20).then((data) =>{
        console.log(data)
        res.status(200).json(data)
    })
})

planRouter.get("/personal/planList",(req,res) =>{
    let uuid = req.query["uuid"]
    Plan.find({owner:uuid}).then((data) =>{
        console.log(data)
        res.status(200).json(data)
    })
})

//新增测试数据用
planRouter.get("/add",(req,res) =>{
    const muscle = new Muscle({
        name : "左转",
        calorie:1000
    })
    muscle.save()
    const diet = new Diet({
        name : "西瓜",
        calorie:1000
    })
    diet.save()
})

planRouter.get("/personal/planDetail",(req,res) =>{
    let id = req.query["templateId"]
    Plan.findById(id)
    .findOne()
    .populate("muscleGroup.muscle")
    .populate("dietGroup.diet")
    .then((data) =>{
        console.log(data)
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
            itemGroup.name = item.diet.name
            itemGroup.id = item.diet._id
            itemGroup.weight = item.weight
            itemGroup.calore = item.calore
            group.push(itemGroup)
        })
        returnData.group = group
        res.status(200).json(returnData)
    })
})

planRouter.post("/personal/AddPlan",(req,res) =>{
    var muscleGroup = []
    var dietGroup = []
    if(req.body.type === "diet"){
        req.body.group.forEach(element => {
            var item = {
                diet:element.diet,
                weight:element.weight
            }
            console.log(item)
            dietGroup.push(item)
        });
    }else{
        req.body.group.forEach(element => {
            var item = {
                muscle:element.muscle,
                number:element.number,
                weight:element.weight,
            }
            console.log(item)
            muscleGroup.push(item)
        });
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


planRouter.get("/personal/dashboard", async (req,res) =>{
    let inCalorie = 0;
    let outCalorie = 0;
    let totalCalorie = 0;
    await req.query["templateId"].split(",").foreach(async (id) =>{
        await Plan.findById(id)
        .findOne()
        .populate("muscleGroup.muscle")
        .populate("dietGroup.diet")
        .then((data) => {
            if(data.type === "diet"){
                data.dietGroup.forEach(item =>{
                    inCalorie += item.weight * item.diet.calorie
                    console.log("inCalorie: " + inCalorie)
                })
            }else{
                data.muscleGroup.forEach(item =>{
                    outCalorie +=  item.weight * item.muscle.calorie * item.number
                    console.log("outCalorie: " + outCalorie)

                })
            }
        })
    })
    res.status(200).json({
    totalCalorie:totalCalorie,
    inCalorie:inCalorie,
    outCalorie:outCalorie
    })

    
    
})

module.exports=planRouter
    