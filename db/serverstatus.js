var mongoose = require('mongoose')

var serverstatus = mongoose.Schema({
    status:{
        type:Boolean,
        default:'true'
    }
})

var serverStatusModel = mongoose.model('serverstatus',serverstatus)

module.exports = serverStatusModel