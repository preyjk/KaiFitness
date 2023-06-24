// 引入express包, 创建路由实例对象
const express = require("express");
const router = express.Router();

// 引入客户端服务操作包
const userService  = require("../services/userServices");
const planService = require("../services/planServices");

/**
 * 
 * user router
 *  
 */

// signUp router
router.post("/user/signUp", userService.signUp);

// signIn router
router.get("/user/signIn", userService.signIn);

/**
 * 
 * plan router
 *  
 */

// get home plan router
router.get("/plan/planList", planService.getHomePlan);

// get dash board
router.get("/personal/dashboard", planService.getDashBoard);

// get personal plan list
router.get("/plan/personal/planList", planService.getPersonalPlanList)

module.exports = router;
