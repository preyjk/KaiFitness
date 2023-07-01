const Plan = require("../db/schemaModel.js").Plan
const Muscle = require("../db/schemaModel.js").Muscle
const Diet = require("../db/schemaModel.js").Diet

// getHomePlan
exports.getHomePlan = (req, res) => {
    let tag = req.query["tag"]
    let sort = req.query["sort"]
    let sortQuery = { createdAt: 1 }
    if (sort === "latest") {
        sortQuery = { createdAt: -1 }
    }
    // console.log(tag)
    let pageNo = Number(req.query["pageNo"])
    // console.log(pageNo)
    let pageSize = 12;
    try {
        Plan.find({ type: tag }).count().then((data) => {
            let count = data
            Plan.find({ type: tag }).sort(sortQuery).skip((pageNo - 1) * pageSize).limit(pageSize)
                .then((data) => {
                    console.log(data)
                    res.status(200).json({ totalcount: count, data: data })
                })
        })
    } catch (e) {
        res.status(500).send(e)
    }
}

// get personal plan list
exports.getPersonalPlanList = (req, res) => {
    try {
        let uuid = req.query["uuid"]
        Plan.find({ owner: uuid }).then((data) => {
            console.log(data)
            res.status(200).json(data)
        })
    } catch (e) {
        res.status(500).send(e)
    }
}

// add personal plan
exports.addPlan = async (req, res) => {
    try {
        var muscleGroup = []
        var dietGroup = []
        if (req.body.type === "diet") {
            req.body.group.forEach(element => {
                var item = {
                    diet: element.diet,
                    weight: element.weight
                }
                console.log(item)
                dietGroup.push(item)
            });
        } else {
            req.body.group.forEach(element => {
                var item = {
                    muscle: element.muscle,
                    number: element.number,
                    weight: element.weight,
                }
                console.log(item)
                muscleGroup.push(item)
            });
        }
        const plan = new Plan({
            type: req.body.type,
            name: req.body.name,
            imagUrl: req.body.imagBase64,
            information: req.body.information,
            detail: req.body.detail,
            owner: req.body.uuid,
            dietGroup: dietGroup,
            muscleGroup: muscleGroup
        })
        plan.save().then(() => {
            res.status(200).send("succeed")
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
}

exports.getDashBoard = async (req, res) => {
    try {
        let inCalorie = 0;
        let outCalorie = 0;
        let totalCalorie = 0;
        let ids = req.query["templateId"].split(",")
        for (const id of ids) {
            let data = await Plan.findById(id)
                .findOne()
                .populate("muscleGroup.muscle")
                .populate("dietGroup.diet")
            if (data.type === "diet") {
                for (const item of data.dietGroup) {
                    inCalorie += item.weight * item.diet.calorie
                    console.log(inCalorie)
                }
            } else {
                for (const item of data.muscleGroup) {
                    outCalorie += item.weight * item.muscle.calorie * item.number
                    console.log(outCalorie)

                }
            }

        }
        res.status(200).json({
            totalCalorie: inCalorie - outCalorie,
            inCalorie: inCalorie,
            outCalorie: outCalorie
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
}

