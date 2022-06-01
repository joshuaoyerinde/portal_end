const mongoose = require('mongoose');
const userSchema = mongoose.Schema; 

const registration = new userSchema({
    firstname:{ type: String, required:true},
    lastname:{ type:String, required: true},
    phone:{ type: String, required:true, unique:true},
    email:{ type:String, required:true},
    dateOfBirth:{ type:String},
    course:{ type:String, required:false},
    status:{type:String},
    image_url:{type:String},
    password:{type:String},
    date:{type:String},
    state:{type:String},    
    local:{type:String},
    parent_name:{type:String},
    parent_number:{type:String}


})

const User = mongoose.model('User',registration);

module.exports = User;  