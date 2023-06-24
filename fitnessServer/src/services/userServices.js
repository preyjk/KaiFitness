const md5 = require("md5")
const jwt = require("jsonwebtoken")
const sercetKey = require("../secret.js");
const User = require("../db/schemaModel.js").User

// signUp
exports.signUp = (req, res) => {
    const user = new User({
        user: req.body.user,
        password: md5(req.body.password),
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        profilePicBase64: req.body.profilePicBase64
    })
    user.save()
        .then(() => {
            res.status(200).send(user._id);
            console.log("signUp successful !");
        })
        .catch((e) => {
            res.status(500).send(e)
            console.log("signUp fail !" + e);
        })
}

// signIn
exports.signIn = (req, res) => {
    User.findOne({ 'user': req.query["user"] }, 'password')
        .then((data) => {
            console.log(data);
            if (md5(req.query["password"]) === data.password) {
                let token = 'Bearer ' + jwt.sign(
                    {
                        _id: data._id,
                    },
                    sercetKey,
                    {
                        expiresIn: 3600 * 24 * 3
                    }
                )
                res.status(200).json({
                    status: 'ok',
                    data: { token: token }
                })
            }
        })
        .catch((err) => {
            console.log("signIn fail:" + err);
            res.status(400).json({ "message": "password or username error!" })
        })
}