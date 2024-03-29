const libExpress = require('express');


const routerUI = libExpress.Router();

routerUI.get("/",(req,res,)=>{
    res.render("index");
})

module.exports = routerUI;