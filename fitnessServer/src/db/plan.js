const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const planSchema = new Schema({
    type: {type:String, enum:["muscle","diet"]},
    name: { type:String,required: true},
    imagUrl: String,
    information:String,
    detail:String,
    owner:{type : Schema.Types.ObjectId,ref:"userinfos"},
    muscleGroup:[{
        muscle:{type : Schema.Types.ObjectId,ref:"muscles"},
        number:Number,
        weight:Number
    }],
    dietGroup:[{
        diet:{type : Schema.Types.ObjectId,ref:"diets"},
        weight:Number
    }]},{
    timestamps: true
  });

planSchema.static.findByOwner = function(ownedId){
    return this.find({owner:ownedId})
}


const Plan = mongoose.model('plans', planSchema);
module.exports = Plan;




