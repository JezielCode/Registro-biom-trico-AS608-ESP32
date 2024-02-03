'use strict'

const express=require('express');
const bodypaser=require('body-parser');
const methodOverride=require('method-override');
const flash = require("connect-flash");
const app=express();
const morgan = require("morgan");
const passport = require('passport');
const session=require('express-session');
const viewDir = `${__dirname}/views`;
const viewDirlogin = `${__dirname}/views/login`;
const publicDir = express.static(`${__dirname}/public`);
require('./passport/local.auth');
//const publicDirLogin = express.static(`${__dirname}/public/login`);

// Async Await para mongo esta bien async(rewr,es){    aeait model.save()}

//Configuraciones

app.set('views', viewDir);
app.set('view engine','pug');  

//app.set('views', viewDirlogin);
//app.set('view engine','jade');  

//Middlewares
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json()); 
app.use(methodOverride('_method')); // esto es para que los formularios jade puedan usar otros metodos como put o delete
app.use(morgan("dev"));
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Variables globales

//Rutas
const routes_index= require("./routes/index");
const routes_perfil= require("./routes/perfil");
const routes_users= require("./routes/users");
const routes_esp8266= require("./routes/esp8266");
        
//app.use('/ventanainicio',routes_index);
//app.use('/userperfil',routes_perfil);
//app.use('/loginuser',routes_users);

app.use(routes_index);
app.use('/perfil',routes_perfil);
app.use('/login',routes_users);

app.use(bodypaser.text());
app.use(routes_esp8266);


//Archivos estaticos

app.use(publicDir);









//Encender server

module.exports=app;