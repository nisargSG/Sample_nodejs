const libExpress = require('express');
const util = require('../../utils')
const ObjectId = require('mongodb').ObjectId;
const teacherRouter = libExpress.Router();

//route to get all teacher
teacherRouter.get("/",(req,res,_)=>{

    util.getDbConnection(function(db){
        if(db){
            db.collection("teachers").find().toArray()
            .then((teacherData)=>res.status(200).json({data:teacherData}))
            .catch(e=>res.status(500).json({error:"Internal Server Error"}))
          
        }
        else
            res.status(500).json({error:"Internal Server Error"})
        
    })
})

//route to get speicific teacher
teacherRouter.get("/:id",(req,res,_)=>{
    util.getDbConnection(function(db){
        if(db){
            db.collection("teachers").find({_id:new ObjectId(req.params.id)}).toArray()
            .then((teacherData)=>res.status(200).json({data:teacherData}))
            .catch(e=>res.status(500).json({error:"Internal Server Error"}))
        }
        else
            res.status(500).json({error:"Internal Server Error"})
        
    })
})

teacherRouter.post("/login",(req,res)=>{

    if(req.body.email && req.body.password){

        util.getDbConnection(function(db){

            if(db){
                
                db.collection("teachers").find({email:req.body.email,password:req.body.password}).toArray()
                .then(teacherArray => res.status(teacherArray.length>0?200:401).json({authorized:teacherArray.length>0}))
                .catch(e=>res.status(401).json({authorized:false}))
            }
            else{
                res.status(401).json({authorized:false})
            }
    
        })

    }else{
        res.status(401).json({authorized:false})
    }

    
    
})

//teacherRouter.router.post()

//route to delete speicific teacher
/*
teacherRouter.delete("/:id",(req,res,next)=>{

    util.getDbConnection(function(db){

        if(db){

            db.collection("teachers").deleteOne({"_id": new ObjectId(req.params.id)})
            .then((teacherData)=>res.status(202).json({data:teacherData}))
            .catch(e=>res.status(500).json({error:"Internal Server Error - Failed To Delete Teacher"}))

        }
        else{
            res.status(500).json({error:"Internal Server Error"})

        }

    })


})*/
//teacherRouter.router.put()


teacherRouter.use("*",(req,res,next)=>{
    res.status(404).json({error:"Invalid Method"})
})


module.exports=teacherRouter