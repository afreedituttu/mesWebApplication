const mongoose = require('mongoose')
const { Schema } = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mesDatabase').then(async()=>{
    console.log('connected');
    // const admin = mongoose.model('admin',{username:{type:String},password:{type:Schema.Types.Mixed},admin:{type:Boolean}})
    // const adminSave = new admin({username:'afreedi',password:'afreedi',admin:true})
    // await adminSave.save()
    // console.log('saved');
}).catch((err)=>{
    console.log(err);

})

module.exports = mongoose
