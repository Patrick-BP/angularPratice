const mongoose = require('mongoose')

const {Schema}  = mongoose;
const studentSchema =  new Schema({
    email: String,
    first_name:String,
    last_name: String,
    avatar:String
});

module.exports = mongoose.model('stutent', studentSchema)