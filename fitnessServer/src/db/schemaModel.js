const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    user: { type: String, unique: true },
    password: { type: String, required: true },
    gender: {
        type: String,
        enum: ["male", "female", "None"]
    },
    height: Number,
    weight: Number,
    profilePicBase64: String
}, {
    timestamps: true
});

const User = mongoose.model('userinfos', userSchema);
exports.User = User;

// Plan Schema
const planSchema = new Schema({
    type: { type: String, enum: ["muscle", "diet"] },
    name: { type: String, required: true },
    imagUrl: String,
    information: String,
    detail: String,
    owner: { type: Schema.Types.ObjectId, ref: "userinfos" },
    muscleGroup: [{
        muscle: { type: Schema.Types.ObjectId, ref: "muscles" },
        number: Number,
        weight: Number
    }],
    dietGroup: [{
        diet: { type: Schema.Types.ObjectId, ref: "diets" },
        weight: Number
    }]
}, {
    timestamps: true
});

// planSchema.static.findByOwner = function(ownedId){
//     return this.find({owner:ownedId})
// }

const Plan = mongoose.model('plans', planSchema);
exports.Plan = Plan;

// Muscle Schema
const muscleSchema = new Schema({
    name: { type: String, required: true },
    calorie: Number
});

const Muscle = mongoose.model('muscles', muscleSchema);
exports.Muscle = Muscle;

// Diet Schema
const dietSchema = new Schema({
    name: { type: String, required: true },
    calorie: Number
});

dietSchema.static.findByName = function (name) {
    return this.find({ name: name })
}

const Diet = mongoose.model('Diet', dietSchema);
exports.Diet = Diet;