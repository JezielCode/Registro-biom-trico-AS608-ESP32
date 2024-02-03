'use strict'

// estas rutas estan destinas para el usuario o usuarios
// por lo tanto estas rutas estan destinadas al usuario registrado
const {isAuthenticated}=require('../helpers/auth');
const express = require("express");
const router= express.Router();
const ControllerPerfil=require('../controllers/perfil');


// router.get('/index',isAuthenticated,ControllerPerfil.Index);

// router.get('/configEmpleados',isAuthenticated,ControllerPerfil.GETconfigEmpleados);

// router.get('/listaEmpleados',isAuthenticated,ControllerPerfil.GETlistaEmpleados);

// router.post('/configEmpleados',isAuthenticated,ControllerPerfil.POSTconfigEmpleados);

// //////////////estos don de pruebas
// router.get('/contadorEmpleados',isAuthenticated,ControllerPerfil.contadorEmpleados);

// router.get('/getagregarEmpleados',isAuthenticated,ControllerPerfil.GETagregarEmpleados);
// router.post('/postagregarEmpleados',isAuthenticated,ControllerPerfil.POSTagregarEmpleados);
// router.post('/eliminarempleado/:id',isAuthenticated,ControllerPerfil.POSTeliminarempleado);
// router.get('/geteditarempleado/:id',isAuthenticated,ControllerPerfil.GETeditarempleado);
// router.post('/posteditarempleado/:id',isAuthenticated,ControllerPerfil.POSTeditarempleado);
// /////////////aqui termnina las pruebas

// router.post('/calcular/:id',ControllerPerfil.calcular);
// router.get('/informaciones/updates',isAuthenticated,ControllerPerfil.updates);

router.get('/index',ControllerPerfil.Index);

router.get('/configEmpleados',ControllerPerfil.GETconfigEmpleados);

router.get('/listaEmpleados',ControllerPerfil.GETlistaEmpleados);

router.post('/configEmpleados',ControllerPerfil.POSTconfigEmpleados);

//////////////estos don de pruebas
router.get('/contadorEmpleados',ControllerPerfil.contadorEmpleados);

router.get('/getagregarEmpleados',ControllerPerfil.GETagregarEmpleados);
router.post('/postagregarEmpleados',ControllerPerfil.POSTagregarEmpleados);
router.post('/eliminarempleado/:id',ControllerPerfil.POSTeliminarempleado);
router.get('/geteditarempleado/:id',ControllerPerfil.GETeditarempleado);
router.post('/posteditarempleado/:id',ControllerPerfil.POSTeditarempleado);
/////////////aqui termnina las pruebas

router.post('/calcular/:id',ControllerPerfil.calcular);
router.get('/informaciones/updates',ControllerPerfil.updates);



///////////// solo para pruebas despues se puede borrar
/////////////

router.get('/logout',(req, res, next) =>{

    req.logout();
    res.redirect('/index');


})
module.exports=router;