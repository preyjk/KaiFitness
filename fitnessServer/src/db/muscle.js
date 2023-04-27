const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
    name: { type:String,required: true},
    calorie: Number
});

planSchema.static.findByName = function(name){
    return this.find({name:name})
}


const Muscle = mongoose.model('Muscle', muscleSchema);
module.exports = Muscle;




