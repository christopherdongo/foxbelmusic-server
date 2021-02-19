const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator');
const {JWT_SECRET} = require('../config/keys')


//crear el usuario y validar los datos
const Signup = async (req, res) => {

    const {email, password} = req.body;

       const errores = validationResult(req);

       if(!errores.isEmpty()) return res.status(400).send({message:errores.array()});
       
       //verificar el usuario si existe
       let userverify = await User.findOne({email});
       if(userverify){
           res.send({message:"el usuario ya esta registrado"});
       }
       const user = new User(req.body);
       //has
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);

    try{
        await user.save();
        const result = {message:"Usuario creado"};
        res.status(201).send(result)
      
            
    }catch(err){
        res.status(500).send({message:"Error al crear Usuario"});
    }
}
//creando token
const createToken=(user, SECRET_KEY, expiresIn)=>{
    const {_id,name, email} = user;
    const payload ={
        _id,
        name,
        email
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

//iniciar session y crear el tokem
const Signin = async (req, res)=>{
    const {email, password} = req.body;
    
      const errores = validationResult(req)
      if(!errores.isEmpty()) return res.status(400).send({errores:errores.array()});
      //validar usuario
      const user = await User.findOne({email:email})
      if(!user) {
      return res.status(422).send({message:"Usuario no encontrado"}) 
      }
    try{
        //verificando password
       const verify = await bcrypt.compare(password, user.password)
       if(!verify){
           res.status(402).send({message:"Error..! la contraseña no coincide"})
       }
       //creando el token:
       const {name, email, } = user;
      const token= await createToken(user, JWT_SECRET, "24h");
      res.status(200).send({token, user:{name, email}})
    }catch(err){
        //const error = {message:"Error al iniciar sessión"}
       // res.status(500).send(error) 
    }
}







module.exports = {
    Signup,
    Signin
}