const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const admin = mongoose.model('admin',{username:{type:String},password:{type:Schema.Types.Mixed},admin:{type:Boolean}})
module.exports =admin
