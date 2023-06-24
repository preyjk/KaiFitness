// //HomePageServieceTester
// const express = require('express')
// const app = express()

// app.use((request,response,next)=>{
//     console.log("Connect Success")
//     next()
// })

// app.get('/recipes', (request,response)=>{
//     const recipes = [
//         {
//             id:"1", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

//         },
//         {
//             id:"2", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

//         },
//         {
//             id:"3", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
            
//         },
//         {
//             id:"4", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
            
//         },
//         {
//             id:"5", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,

//         },
//         {
//             id:"6", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
            
//         },
//         {
//             id:"7", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

//         },
//         {
//             id:"8", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
            
//         },
//         {
//             id:"9", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

//         },
//         {
//             id:"10", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
            
//         },
//         {
//             id:"11", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

//         },
//         {
//             id:"12", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
//             subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
            
//         }
//     ]
//     response.send(recipes)
// })

// app.listen(5000,(err)=>{
//     if(!err) console.log('Success url http://localhost:5000/recipes');
// })