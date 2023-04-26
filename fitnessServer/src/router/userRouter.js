
const User = require("../db/user")
const userRouter = express.Router()

userRouter.post("/signUp",(req,res) =>{
    const user = new User({
        user : req.body.user,
        password : md5(req.body.password),
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        profilePicBase64: req.body.profilePicBase64
    })
    user.save();
    res.send(user._id)
})


userRouter.get("/signIn",(req,res) =>{
    let flag = User.IdentifyByPassword(req.param("name"),req.param("password"))
    let user = User.findByIdAndRemove(req.param("name"))
    if(flag){
        let token = 'Bearer ' + jwt.sign(
            {
              _id: user._id,
            },
            sercetKey,
            {
              expiresIn: 3600 * 24 * 3
            }
          )
          res.status(200)
          res.json({
            status: 'ok',
            data: { token: token }
          })
    }else{
        res.status(400).json({"message":"password or username error!"})
    }

})



module.exports = userRouter;

