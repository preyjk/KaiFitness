const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dietSchema = new Schema({
    name: { type:String,required: true},
    calorie: Number
});

const Diet = mongoose.model('diets', dietSchema);
module.exports = Diet;