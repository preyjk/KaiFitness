const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const planSchema = new Schema({
    type: {type:String, enum:["muscal","diet"]},
    name: { type:String,required: true},
    imagUrl: String,
    information:String,
    detail:String,
    owner:{type : Schema.Types.ObjectId,ref:"UserInfo"},
    muscleGroup:[{
        muscle:{type : Schema.Types.ObjectId,ref:"Muscle"},
        number:Number,
        Weight:Number
    }],
    dietGroup:[{
        diet:{type : Schema.Types.ObjectId,ref:"Diet"},
        Weight:Number
    }]
});

planSchema.static.findByOwner = function(ownedId){
    return this.find({owner:ownedId})
}


const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;




