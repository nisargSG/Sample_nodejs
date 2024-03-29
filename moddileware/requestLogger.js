const util = require('../utils')


module.exports = (req,res,next)=>{
    util.logger(`${req.method} ${req.path}`)
    next()
}