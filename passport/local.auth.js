'use strict'
const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modelbuffer=require('../models/buffer');
const jwt=require('jsonwebtoken');



const User = require('../models/users');

//console.log('entraste a post uno');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
passport.serializeUser((user, done) => {
  return Promise.resolve(user.id);
});

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, null);
    });
});


passport.use('local-signup', new LocalStrategy({
  // primeramente le ponemos un nombre, en este caso local-signup luego una nueva 
  //funvion que recive dos parametros o con req paa recibir mas parametros
  //si asi lo require... , email y password vienen del jade al presionarse el POST 
  // desde routes.
           usernameField: 'email',
           passwordField: 'password',
           passReqToCallback: true
  }, async (req,res, email, password, done) =>{   
     
     const email1=req.body.email;
     const nombre1=req.body.name;
     const book1= req.body.telefono;
     const contrasena= req.body.password;
     const confirpas=  req.body.confirmPassword;
     console.log(email1+ nombre1+ book1+ contrasena+ confirpas);


     const user = await User.findOne({email:email});
     if(user){
       console.log('El usuario ya existe');
       req.flash('Mensajecaja','el usuario ya existe ');
     //  return done(null, false, console.log('El usuario ya existe'));
     console.log('El usuario ya existe');
     return {"sdsd":23};
  
    } else{
       if(password.length>6){
        const newuser = new User();
        newuser.email = email;
        newuser.nombre=req.body.name;
        newuser.telefono=req.body.telefono;
        newuser.contrasena=req.body.password;
        
        newuser.password = newuser.encryptPassword(password);
        const saveUser=await newuser.save();
        const token=jwt.sign({id:saveUser._id},'uneria23',{
          expiresIn:86400
        });

        //return res.status(200).send(token);
  
        return done(null, newuser);
        }else{
           //console.log('Contrasena muy corta ');
          // req.flash('Mensajecaja','el usuario ya existe ');
           //return done(null, false, req.flash('passMessage','el usuario ya existe '));
           return done(null, false, console.log('Contrasena muy cortaaaaa '));
          // res.render('signup');
        }
    
  
     }
     
  }));


passport.use('local-signin', new LocalStrategy({
// primeramente le ponemos un nombre, en este caso local-signup luego una nueva 
//funvion que recive dos parametros o con req paa recibir mas parametros
//si asi lo require... , email y password vienen del jade al presionarse el POST 
// desde routes.


         usernameField: 'email'
        // passwordField: 'password'  
        // passReqToCallback: true
}, async ( email, password, done) =>{   
  console.log('entraste a post uno');

  const savebuffer= new modelbuffer({
       buffer:email
  });
  await savebuffer.save();
 //  console.log(savebuffer);
   
   const user = await User.findOne({email:email});
   //console.log(user);
   if(!user){
    // console.log('usuario no encontrado');
    // req.flash('Mensajecaja','el usuario ya existe ');
    return done(null, false, console.log('Usuario no encontrado'));

  } else{
    console.log('usuario encontrado');
     const compare= await user.comparePassword(password);
    if(compare){
      return done(null, user,'Josue');

    }else{
      return done(null, false,console.log('Contrasena incorrecta'));

    }
  
  }
  //done(null, user);
}));





