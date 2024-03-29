//set up environment configuiration
require('dotenv').config()
//import util 
const util = require('./utils')
//http library
const libExpress = require('express')
const libPug = require('pug');
const libPath = require('path');

//importing middle wares
const middleWareRequestLogger = require('./moddileware/requestLogger')


//start app
const app = libExpress();
//app need to parse body into json if receieved
app.use(libExpress.json());
//allow static files request
app.use(libExpress.static(libPath.join(__dirname,"public")))
//template engine - pug
app.set('view engine', 'pug')

//User Request Logger
app.use(middleWareRequestLogger);
//API
app.use("/api",require('./router/api'));
//UI
app.use(require('./router/ui'));

app.listen(process.env.APP_PORT,()=>{
    util.logger(`Server is listening at ${process.env.APP_PORT}`,"success");
})