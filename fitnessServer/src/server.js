require("./db/dbUtils");

const express = require("express");
const router = require("./router/router.js");

// createServer by express
const app = express();

//检查，解析token，设置需要权限的路由地址
//自动为req对象添加user属性，包含解析后的token内容
// app.use(
//   expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
//     path: ["/user/signIn", "/user/signUp"],
//   })
// );

// make res.body can be paresed
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json({ limit: "1000kb" }));

// use router
app.use(router);

// express错误处理中间件
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    return res.send({ status: 401, message: "无效的token" });
  } else {
    return res.send({ status: 500, message: "未知错误" });
  }
});

// start server on port 900 
app.listen(900, ()=>{
  console.log("App server listening on port 900!");
})