const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types;

const UserSchema = Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    },
    register:{
        type:Date,
        default:Date.now()
    },
    resetToken:String,
    expireToken:Date,
    favorite:[
        {
            type:ObjectId,
            ref:'Users',  
        }
    ]
})

module.exports = mongoose.model('Users', UserSchema);