const libExpress = require('express');
const routerTeacher = require('./rest/teacher')



apiController = libExpress.Router();


apiController.use("/teacher",routerTeacher)
//apiController.use("/student",routerTeacher)
//apiController.use("/doctor",routerTeacher)

apiController.use("*",(req,res,next)=>{
    res.status(404).json({error:"No Such API Found"})
})


module.exports = apiController;