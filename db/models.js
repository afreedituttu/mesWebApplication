var mongoose = require('mongoose')
const { Schema } = require('./connection')
const defaultDate = new Date()
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    school:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,
        trim:true
    },
    email:{
        type:Schema.Types.Mixed,
        minlength:6,
        maxlength:30,
        unique:[true,'email already exist'],
        trim:true
    },
    phoneNumber:{
        type:Number,
        unique:[true,'phone number already exist'],
        minlength:9,
        maxlength:11
    },
    whatsappNumber:{
        type:Number,
        unique:[true,'whatsapp number already exist'],
        minlength:9,
        maxlength:11
    },
    joindate:{
        type:Date,
        default:Date.now()
    },
    address:{
        type:Schema.Types.Mixed,
        minlength:3,
        maxlength:100,
    }
})
const student = new mongoose.model('students',studentSchema)


module.exports = student