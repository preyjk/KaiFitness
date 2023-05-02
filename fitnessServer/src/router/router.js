// 引入express包, 创建路由实例对象
const express = require("express");
const router = express.Router();
//引入客户端服务操作包
const cServices = require("../services/clientServices");

// /**
//  *
//  * 客户端路由
//  *
//  */

// // 用户注册路由
// router.post("/user/sign", cServices.sign);

// // 用户登录路由
// router.post("/user/login", cServices.login);

// // 用户登录状态查询
// router.post("/user/confirmLogin", cServices.confirmLoginStatus);

// // 个人Profile路由
// router.get("/profile", cServices.profile);

module.exports = router;
