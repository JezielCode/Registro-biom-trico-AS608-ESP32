'use strict'

// estas rutas estan destinadas al login es decir
//para poder registrarse o al momento de iniciar sesion y todo
//lo referente como mensajes para avisasr
const express = require("express");
const router= express.Router();
const passport=require('passport');
const ControllerUsers=require('../controllers/users');
require('../passport/local.auth');

router.get('/index',ControllerUsers.Index); // este es solo prueba nada importante
router.get('/signup',ControllerUsers.GetSignup);

router.post('/signup',ControllerUsers.PostSignup);
router.post('/signin',ControllerUsers.PostSignin);


// router.post('/signup',passport.authenticate('local-signup',{
  
//     successRedirect: '/login/signin',
//     failureRedirect: '/login/signup',
//     passReqToCallback:true
   
// }));

router.get('/signin',ControllerUsers.GetSignin);
// router.post('/signin',passport.authenticate('local-signin',{
    
//     successRedirect: '/perfil/index',
//     failureRedirect: '/login/signin',
//     passReqToCallback : true
//      })

// );



router.get('/perfil',ControllerUsers.GetPerfil);
module.exports=router;