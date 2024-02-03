'use strict'
//En este indez se va manejar todas las rutas que tengan que ver
//con lo visual para todo el mundo que entre
// es decir inicio.. contactos... acerca de .. nostros... y demas que 
//podra ser visto para toso
const {isAuthenticated}=require('../helpers/auth');
const express = require("express");
const router= express.Router();
const ControllerIndex=require('../controllers/index');

router.get('/index',ControllerIndex.Index);
router.get('/about',ControllerIndex.About);
router.get('/contact',ControllerIndex.Contact)



module.exports=router;