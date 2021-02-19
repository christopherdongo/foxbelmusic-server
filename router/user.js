const express = require('express')
/*import controller*/
const UserController = require('../controllers/usercontroller')
//express validator
const {check, header} = require('express-validator');
//middleware
const Middleware = require('../middleware/midleware')
const router = express.Router();


router.post('/api/signup', 
 [check('name', 'El nombre es obligatorio').not().isEmpty().toLowerCase(),
  check('email', 'Agregar un email valido').isEmail().toLowerCase(),
  check('password','El password debe de tener minimo 8 caracteres').isLength({min:8}),
],
UserController.Signup);


router.post('/api/signin',[
  check('email', 'Agregar un email valido').isEmail(),
  check('password', 'Ingrese un password').not().isEmpty().isLength({min:8})
],UserController.Signin);

router.post('/api/favorite/',[header('authorization','Usted no ha iniciado session').isEmpty()], Middleware.VerifyTokenWed)


module.exports = router;