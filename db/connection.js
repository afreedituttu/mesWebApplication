const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(async()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);

})

module.exports = mongoose
