// import express from "express"

// const router=express.Router();

// router.get("/",(req,res)=>{
//     res.json({
//         message:"API is rocking"
//     })
// })

// router.get("/about",(req,res)=>{
//     res.json({
//         message:"This is about page"
//     })
// })

// router.get("/profile",(req,res)=>{
//     res.json({
//         message:"This is profile page"
//     })
// })

// // For post request we need urlEncoder in app.ts

// //sending single element to server
// // router.post("/",(req,res)=>{
// //     const data = req.body;
// //     console.log(data);
// //     res.json({
// //         message:data
// //     })
// // })

// //sending multiple elements to server
// router.post("/",(req,res)=>{
//     const {name,email}=req.body;
//     console.log(name);
//     console.log(email);
//     res.json({
//         user:{
//             name,
//             email
//         },
//     });
// });

// export {router};


import express from "express";
import { Todo } from "../models/user_models";
import { ObjectId } from 'mongodb';
const router=express.Router();

//POST REQUEST
router.post("/add",async(req,res)=>{

    const {title,description}=req.body;
    const dataItem=Todo.set({title,description});
    await dataItem.save();
    return res.status(200).json({
        data:dataItem,
    })

});

//GET REQUEST
router.get("/",async(req,res)=>{

    try {
        
        const dataItem = await Todo.find({});
        res.status(200).json({
            data:dataItem,
        })

    } catch (error) {
        console.log(error);
    }

});

//DELETE REQUEST
// router.delete("/delete",async(req,res)=>{

//     const filter={
//         id:req.body.id,
//     }
        
//     const dataItem = await Todo.deleteOne(filter).then((data)=>
//         res.json({
//             data:data,
//         })
//     ).catch((error)=>{
//         return res.send(error);
//     });

// });
// router.delete("/delete/:id", async (req, res) => {
    
//     const filter = {
//         _id: req.params.id,
//     };  
  
//     const dataItem = await Todo.deleteOne(filter).then((data) =>
//       res.json({
//         data: data,
//       })
//     ).catch((error) => {
//       return res.send(error);
//     });
//   });
router.delete("/delete/:id", async (req, res) => {
    const filter = {
      _id: new ObjectId(req.params.id), 
    };
  
    const dataItem = await Todo.deleteOne(filter).then((data) =>
      res.json({
        data: data,
      })
    ).catch((error) => {
      return res.send(error);
    });
  });


//UPDATE REQUEST
router.put("/update",async(req,res)=>{

    const filter={
        id:req.body.id,
    }

    const updatedData={
        title:req.body.title,
        description:req.body.description
    }
        
    const dataItem = await Todo.updateOne(filter,updatedData,{
        new:true,
    }).then((data)=>
        res.json({
            data:data,
        })
    ).catch((error)=>{
        return res.send(error);
    });

});



export {router};