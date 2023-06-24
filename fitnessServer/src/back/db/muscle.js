const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
    name: { type:String,required: true},
    calorie: Number
});


const Muscle = mongoose.model('muscles', muscleSchema);
module.exports = Muscle;




