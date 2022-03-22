const admin = require('../db/adminModels')
const mongoose = require('mongoose')

middleWares = {
    verifyLogin:async function(req,res,next){
    if(req.session.loggedIn){
        let adminData = await admin.find({admin:true})
        const adminId = String(adminData[0]._id)
        const dataId = String(mongoose.Types.ObjectId(req.session.userId))
        if(adminId==dataId){
            next()
        }else{
            res.redirect('http://localhost:3000/code123admin/login')
        }
    }else{
        
        res.redirect('http://localhost:3000/code123admin/login')
        next()
    }
}}
module.exports = middleWares
