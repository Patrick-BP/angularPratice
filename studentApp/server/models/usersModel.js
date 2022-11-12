const mongoose = require('mongoose')

const {Schema}  = mongoose;
const userSchema =  new Schema({
    email: String,
    fullname:String,
    password:String,
    
    
});

module.exports = mongoose.model('user', userSchema)