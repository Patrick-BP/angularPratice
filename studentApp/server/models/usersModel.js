const mongoose = require('mongoose')

const {Schema}  = mongoose;
const userSchema =  new Schema({
    email: String,
    first_name:String,
    last_name: String,
    password:String,
    
    
});

module.exports = mongoose.model('user', userSchema)