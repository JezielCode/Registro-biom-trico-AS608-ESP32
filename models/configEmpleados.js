const mongoose = require('mongoose');


const {Schema} = mongoose;


const userSchema = new Schema({
     horaentrada: String, //aqui pone la hora enla que los empleados entran
     horaentradamax: String,
     horasalida: String, // aqui se pone la hora en la que salen los empleados

     minentrada:Number, // aqui se define cuantos minutos extra tiene para entrar y asi contar como
                        // si entrara puntual
     minSalida: Number, // aqui se define cuantos minutos extras para salir 
     ///por lo que alisatarse,recojer estaran hay y sera contado como si saliera puntual

     /// definin las mulatas por llegar tarde se vera configurado de igual manera 
     // como por ejemplo si entra mas tarde despues de las min extras establecidos
     // entonces se le contadara ese dia como DESCUENTO  
     descuento:Number,// aqui se marca el descuento por llegar tardes y se vera si llega una hora tarde
     // despues pasada la hora se le tomara como dia no trabajo
     
     ////////////////////////////////////// aqui se configura sobre el pagao por hora al empleado
     pagohora:Number

});


module.exports = mongoose.model('configEmpleados', userSchema);