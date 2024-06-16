// import express from "express"
// import { router } from "./routes/routes";
// import { postDataToMongo, readDataFromMongo } from "./database/database";

// const app=express();
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

// readDataFromMongo();
// postDataToMongo();
// app.use("/",router);

// app.listen(8080,()=>{
//     console.log("Server Started at 8080");
// })

//normal route
// app.get("/",(req,res)=>{
//     res.send("HELLO world");
// })


//sending json
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"API is Running"
//     });
// })

//req url
// app.get("/",(req,res)=>{
//     const data=req.url;
//     res.status(200).json({
//         message:data
//     })
// })


//custom routes by importing router from routes.ts
// app.use("/",router)

import mongoose from "mongoose";
import express from "express";
import { router } from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
    console.log("DB Connected!!");
}).catch((error) => {
    console.error("DB Connection Error:", error);
});


app.use("/",router);
app.listen(8080,()=>{
    console.log("Server Running at 8080");
})