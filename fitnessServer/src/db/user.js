
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
});

// query by name
userSchema.statics.findByName = async function(name) {
    console.log("findByName   " + name)
    this.find({user:name}).findOne().then((data) =>{
        console.log(data)
    })
    return "user"
}

// identify by password
userSchema.statics.IdentifyByPassword = function(name,password) {
    let user =  this.findByName(name)
    console.log("IdentifyByPassword   " + user)
    return user.password === md5(password)
}

const User = mongoose.model('UserInfo', userSchema);
module.exports = User;
