    //mongodb+srv://admin:3BMk0ADC1Q7RH0zm@cluster0.incoq90.mongodb.net/

    //3dkxyDvvgLjWgkZE
    const express = require('express');
    const mongoose = require('mongoose');
    const router = require('./Route/UserRouters');

    const app = express();  
    const cors = require('cors');

    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use("/userPakaya",router);


    mongoose.connect('mongodb+srv://nuwanthatharindu99:3dkxyDvvgLjWgkZE@cluster0.zhu4kz2.mongodb.net/')
    .then(()=>{console.log("Database connected successfully");})
    .then(()=>{
        app.listen(5000);
    })
    .catch((err)=> console.log((err))); 


    //call regiuster model
   require('./Models/RegisterModel');
   const RegUser = mongoose.model('Register');
   app.post("/register",async (req,res)=>{
    const {firstName,lastName,username,email,mobile,country,birthday,password} = req.body;
    try{
        await RegUser.create({
            firstName,lastName,username,email,mobile,country,birthday,password
        });
        res.send({states:"ok"})
    }catch(err){
        res.send({states:"error"})
        console.log(err);
    }
   }) 

   //login 

   app.post("/login",async (req,res)=>{
        const {email,password} = req.body;
        console.log(email,password);
        try{
            const regUser = await RegUser.findOne({email})
            
            if(!regUser){
                return res.json({err:"user not found"});
            }

            if(regUser.password === password){
                return res.json({status:"ok"});
            }else{
                return res.json({err:"incorrect passwoard"});
            } 
        }catch(err){
            console.log(err);
            res.status(500).json({error:err.message});
        
        }
   })