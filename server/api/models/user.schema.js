const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcryptjs = require('bcryptjs')

// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true,'email address required'],
        validate: [isEmail,'invalid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'password required'],
        minlength: [3,'too short password']
    }
})

// hashing password
userSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10);
    next()
})

// exports
module.exports = mongoose.models.User || mongoose.model('User',userSchema)