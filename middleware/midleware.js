const jsonwetoken = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const User = require('../model/user');
const {validationResult} = require('express-validator')

const VerifyTokenWed=async (req, res, next)=>{
       
       //authorization === Bearer


     try{
       
     }catch(err){
         console.log(err);
     }

}


module.exports = {
    VerifyTokenWed
}