const mongoose = require('mongoose');
//const conf = require('./db-conf-login');
const bcrypt=require('bcrypt-nodejs');
const passport = require('passport');
//const passport = require('passport');

const {Schema} = mongoose;


const userSchema = new Schema({
     email: String,
     password: String,
     nombre:String,
     telefono:Number,
     contrasena:String


     /// Aqui se podria poner mas atributos como telefono edad nose.

});


userSchema.methods.encryptPassword = (password) =>{

  return bcrypt.hashSync(password,bcrypt.genSaltSync(10));

};

userSchema.methods.comparePassword = function(password){

  return bcrypt.compareSync(password, this.password);
  
};

module.exports = mongoose.model('users', userSchema);