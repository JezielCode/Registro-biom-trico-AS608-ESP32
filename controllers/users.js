'use strict'

//const { use } = require("passport");
// const passport = require('passport');
const modelUsers=require('../models/users');

// require('../passport/local.auth');

function Index(req,res){

    res.send('Ventanas de inicio');
  //  res.render('signin');

}

function GetSignin(req,res){

    //res.send('iniciar sesion');
 res.render('login', { title: 'Log In'});

}
function GetPerfil(req,res){

  //res.send('iniciar sesion');
  res.render('perfil');

}


function GetSignup(req,res){

    //res.send('formulario para autentificarse');
    res.render('register', { title: 'Sign Up' });
}

async function PostSignin (req,res){

  const email=req.body.email;
  const password="req.body.password";
  // const usuario = new modelUsers();
  const user = await modelUsers.findOne({email:email});
  //console.log(user);
  if(!user){
   // console.log('usuario no encontrado');
   // req.flash('Mensajecaja','el usuario ya existe ');
   return { msg: 'Usuario no encontrado'};//json done(null, false, console.log('Usuario no encontrado'));

 } else{
   console.log('usuario encontrado');
    const compare= await user.comparePassword(password);
   if(compare){
     //return done(null, user,'Josue');
     res.redirect('perfil');

   }else{
     //return done(null, false,console.log('Contrasena incorrecta'));
     res.redirect('signin');
   }
 
 }
}
async  function PostSignup  (req,res){

     const nombre=req.body.nombre;
    const email=req.body.email;
    const password="req.body.password";
    const Confirpassword="req.body.password";//req.body.Confirpassword;
  //   console.log(nombre + " " +email +" "+password+" "+Confirpassword);
       if(password!=Confirpassword){
           console.log('Las contrasenas no coinciden');
           res.redirect('signup');

       }else{
         if(password.length<6){
            res.redirect('signup');
            console.log('contrasena muy corta');
            
         }else{

          const usuario = new modelUsers();
             usuario.name= req.body.nombre;
             usuario.email= req.body.email;
             usuario.password=req.body.password;
             usuario.password= await usuario.encryptPassword(password);
             console.log(usuario.password);

            // modelUsers.findOne({name:'sergioq'}).exec((err,docs)=>{
           //   if(err) throw err
           //     console.log('usuario encontrado');
            //    console.log(docs.name)
   
            // });
          console.log(email);
          const emailuser="" ;//await modelUsers.findOne({email:email});
          if(emailuser){

            console.log('usuario encontrado no puede volver a crear una cuenta con el mismo usuario');
            res.render('signup');
          }else{

            const saaveusers=await usuario.save();
               if(saaveusers){
                   console.log('usuario creado y guardado con exito');
                    res.redirect('signin');

               }else{
                console.log('usuario no creado y tampoco guardado con exito');
                   res.redirect('signup');

               }
          }
          
         }

       }
}

module.exports={  

    Index,
    GetSignin,
    PostSignup,
    GetSignup,
    GetPerfil,
    PostSignin
}