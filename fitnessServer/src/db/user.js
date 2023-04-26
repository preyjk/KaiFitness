
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


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
userSchema.statics.findByName = function(name) {
    return this.findOne({user:name})
}

// identify by password
userSchema.statics.IdentifyByPassword = function(name,password) {
    let user =  this.findByName(name)
    return user.password === md5(password)
}

const User = mongoose.model('UserInfo', userSchema);
module.exports = User;
