const MongoClient = require('mongodb').MongoClient;
const libChalk = require('chalk')
const  libMoment = require('moment')
const libFs = require('fs')
const libPath = require('path');

const util ={}

util.getDbConnection = async (callbackFunction)=>{

    MongoClient.connect(process.env.MONGO_URL).then((dbConnection)=>{
        callbackFunction(dbConnection.db(process.env.MONGO_DB))
    }).catch((e)=>{
        callbackFunction(false)
        util.logger(e,"error")
    });

}

util.loggerChalkPicker={
    "common":libChalk.white,
    "error":libChalk.red,
    "warn":libChalk.yellow,
    "success":libChalk.green,

}

util.loggerSignPicker={
    "common":"[*]",
    "error":"[-]",
    "warn":"[!]",
    "success":"[+]",
}

util.logger=(msg,type="common",track=true)=>{

    const currentDateTime = libMoment().format('DD-MM-YYYY HH:mm:ss');   
    const currentLogFile = process.cwd()+libPath.sep+'log'+libPath.sep+`${libMoment(currentDateTime, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')}.log`;
    const logToPrint= `${util.loggerSignPicker[type]} ${currentDateTime} ${msg}`;
    console.log(util.loggerChalkPicker[type](logToPrint))
    if(track){
        //if doesn't exist then create one log file
        if (!libFs.existsSync(currentLogFile)) {
            libFs.writeFileSync(currentLogFile,`-------Logs--------`)
        }

        //write logs inside
        libFs.appendFile(currentLogFile,"\n"+logToPrint,(error)=>{
            if(error){
                throw new Error('Failed To Save Logs , Please Check the issue : '+error);
            }
        })

    }

}



module.exports=util
