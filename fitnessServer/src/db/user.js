
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const md5 = require("md5")

const userSchema = new Schema({
    user: {type:String, unique:true},
    password: { type:String,required: true},
    gender:{
        type:String,
        enum:["male","female","None"]
        },
    height: Number,
    weight:Number,
    profilePicBase64:String
},{
    timestamps: true
  });

const User = mongoose.model('userinfos', userSchema);
module.exports = User;
