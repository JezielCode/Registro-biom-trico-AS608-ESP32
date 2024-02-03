'use strict'

const mongoose=require('mongoose')
const {Schema}=mongoose;

const empleadoSchema=new Schema({

  
  nombre: String,
  apellidos: String,
  telefono: Number,
  carnet: String,
  direccion:String,
  fecha: Date,
  
  Entrada:[Date],
  Salida:[Date],
  Descuento:[Number]
 
});


module.exports=mongoose.model('listaempleados',empleadoSchema);