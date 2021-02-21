const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { JWT_SECRET } = require("../config/keys");

//crear el usuario y validar los datos
const Signup = async (req, res) => {
  const { email, password } = req.body;

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).send({ message: errores.array() });
  }

  //verificar el usuario si existe
  const userverify = await User.findOne({ email });
  if (userverify) {
    return res
      .status(400)
      .send({ message: "el usuario ya se encuentra registrado" });
  }

  const user = new User(req.body);
  //hash al password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    const result = { message: "Usuario creado" };
    res.status(201).send(result);
  } catch (err) {
    return res.status(500).send({ message: "Error al crear Usuario" });
  }
};
//creando token
const createToken = (user, SECRET_KEY, expiresIn) => {
  const { _id, name, email } = user;
  const payload = {
    _id,
    name,
    email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

//iniciar session y crear el tokem
const Signin = async (req, res, next) => {
  
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).send({ errores: errores.array() });
  }
  //validar usuario

  let users = await User.findOne({ email: req.body.email });
  if (!users) {
    res.status(400).send({ message: "el usuario no existe" });
    return next(); //paraliza la ejecucion
  }
  //verificando password
  const verify = bcrypt.compareSync(req.body.password, users.password);
  if (!verify) {
    return res.status(400).send({ message: "Contraseña incorrecta" });
  }
   const {name, email} = users;
  try {
    const token = createToken(user, JWT_SECRET, "24h");
    return res.status(200).send({ token, user:{name, email}});
  } catch (err) {
    return res.status(500).send({ message: "Error al iniciar sesion" });
  }
};

module.exports = {
  Signup,
  Signin,
};
