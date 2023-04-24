//引入express包
const express = require("express");
const router = require("./router/router.js");
var { expressjwt: expressJWT } = require("express-jwt");
const sercetKey = require("./secret.js");

//用express创建web服务器，取代了使用http模块的方法createServer
const app = express();

//检查，解析token，设置需要权限的路由地址
//自动为req对象添加user属性，包含解析后的token内容
app.use(
  expressJWT({ secret: sercetKey, algorithms: ["HS256"] }).unless({
    path: ["/user/sign", "/user/login"],
  })
);

//使res.body能被解析，否则post请求中的req.body无法被解析
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json({ limit: "1000kb" }));

//使用路由
app.use(router);

//express错误处理中间件
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    return res.send({ status: 401, message: "无效的token" });
  } else {
    return res.send({ status: 500, message: "未知错误" });
  }
});

app.get('/recipes', (request,response)=>{
  const recipes = [
      {
          id:"1", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

      },
      {
          id:"2", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

      },
      {
          id:"3", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
          
      },
      {
          id:"4", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
          
      },
      {
          id:"5", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,

      },
      {
          id:"6", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
          
      },
      {
          id:"7", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

      },
      {
          id:"8", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
          
      },
      {
          id:"9", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

      },
      {
          id:"10", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
          
      },
      {
          id:"11", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

      },
      {
          id:"12", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
          subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
          
      }
  ]
  response.send(recipes)
})

//监听端口，启动服务器
app.listen(900, () => {
  console.log("express server running on 127.0.0.1");
});
