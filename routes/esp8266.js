'use strict'

// estas rutas estan destinas para el usuario o usuarios
// por lo tanto estas rutas estan destinadas al usuario registrado
const {isAuthenticated}=require('../helpers/auth');
const express = require("express");
const router= express.Router();
const Controllexcel=require('../controllers/excelgenerator')
const Controlleresp8266=require('../controllers/esp8266');



// router.post('/esp8266/:id',Controlleresp8266.insertBiometrico);
// router.post('/esp8266/descargarBasico/:id',isAuthenticated,Controllexcel.descargarBasicoCalcu);// 
// router.post('/esp8266/descargarBasicoPro/:id',isAuthenticated,Controllexcel.descargarBasicoCalcuPro);
// router.post('/esp8266/calcular/:id',isAuthenticated,Controlleresp8266.calcularBiometrico);
// router.post('/esp8266/calcularpro/:id',isAuthenticated,Controlleresp8266.calcularBiometricoPro);

router.post('/esp8266/:id',Controlleresp8266.insertBiometrico);
router.post('/esp8266/descargarBasico/:id',Controllexcel.descargarBasicoCalcu);// 
router.post('/esp8266/descargarBasicoPro/:id',Controllexcel.descargarBasicoCalcuPro);
router.post('/esp8266/calcular/:id',Controlleresp8266.calcularBiometrico);
router.post('/esp8266/calcularpro/:id',Controlleresp8266.calcularBiometricoPro);


module.exports=router;