'use strict'

const modelesp8266=require('../models/listaEmpleados');
const configEmpleado=require('../models/configEmpleados');//
//const idocnfigempleado=require('../env.variables.json');



async  function insertBiometrico(req,res){
    const ide=req.params;
    const id=ide.id;

const getfechaActual=new Date();

//res.send(getfecha);

//////////////////////////////////////////////////////////////////////////////////////
const hour= getfechaActual.getHours();
const min=getfechaActual.getMinutes();
const dia=getfechaActual.getDay();
const mes=getfechaActual.getMonth();

//////////////////////////////////////////////////////////////////////////////////////
  
//////////////////////////////////////////////////////////////////////////////////////
const Configfecha=await configEmpleado.findById({'_id':'65977e749643a5597c95067c'});
//65977e749643a5597c95067c
//ff23ff23ff23ff23ff23ff23
const modelgethour=parseInt((Configfecha.horaentrada).slice(0,2)); 
const modelgetmin=parseInt((Configfecha.horaentrada).slice(3,5)); 

const minentradaextra=Configfecha.minentrada; 


const modelgethourmax=parseInt((Configfecha.horaentradamax).slice(0,2)); 
const modelgetminmax =parseInt((Configfecha.horaentradamax).slice(3,5)); 


console.log((((hour)*100)+ min));
console.log(((modelgethourmax*100)+modelgetminmax));
//console.log(minentradaextra);
//////////////////////////////////////////////////////////////////////////////////////
 
if((((hour)*100)+ min) >=((modelgethour*100)+modelgetmin -15) && (((hour)*100)+ min)<=((modelgethourmax*100)+modelgetminmax)){
  // x ejemplo si hora actual es 7:20 y mi hora de entrada es 8:30
  // si es asi entonces 
  if((((hour)*100)+ min)<=(((modelgethour*100)+modelgetmin+minentradaextra))){
    // x ejemplo si hora actual es 7:20 y mi hora de entrada es 8:30
    // si es asi entonces 
    console.log('entro en hora adecuada por lo tanto se ira a su base de datos');
    await modelesp8266.findByIdAndUpdate({'_id':id},{
      $push:{
      Entrada:new Date(),
      Salida:new Date('2020-12-02T00:00:00.000Z'),
      Descuento:0
      }
      
     // $pop:{
       // Entrada:1
        
        //}

   }).exec((err,docs)=>{
        if(err) {
            console.log('error no se guardo');
        }else{
  //  console.log(docs);
  //     res.send('Pa');
       console.log('Guardado con exito Entrada');
   }
});
  
  
  
  }else{
    console.log('se le asignara un descuento al empleado');
    //Aqui se debe asignar un descuento y registrar su fecha tambien 
    // en caso de que supere pues no se lo registra y es contado como dia sin paga
    await modelesp8266.findByIdAndUpdate({'_id':id},{
      $push:{
      Entrada:new Date(),
      Salida:new Date('2020-12-02T00:00:00.000Z'),
      Descuento:1
      }
      
     // $pop:{
       // Entrada:1
        
        //}

   }).exec((err,docs)=>{
        if(err) {
            console.log('error no se guardo');
        }else{
  //  console.log(docs);
  //     res.send('Pa');
       console.log('Guardado con exito Entrada pero con retraso');
   }
   });
  }



}//else{
  //console.log('no se va registrar al usuario no vino a trabajar');


//}






const modelgethourSal=parseInt((Configfecha.horasalida).slice(0,2)); 
const modelgetminSal=parseInt((Configfecha.horasalida).slice(3,5)); 

const minsalidaaextraSal=Configfecha.minSalida; 



console.log((((hour)*100)+ min));
(((modelgethourSal*100)+modelgetminSal));

if((((hour)*100)+ min) >=((modelgethourSal*100)+modelgetminSal) && ((((hour)*100)+ min)<=((modelgethourSal*100)+modelgetminSal)+minsalidaaextraSal)){

    console.log('Salio en hora adecuada por lo tanto se ira a su base de datos');
   
   const verificar= await modelesp8266.findById({'_id':id},{_id:false,Entrada:true});
   const verificate=(verificar.Entrada[verificar.Entrada.length-1]); 
   console.log(verificate);
   console.log(verificate.getHours());
   console.log(verificate.getMinutes());
   console.log(verificate.getDay());
   console.log(verificate.getMonth());

   if(dia==verificate.getDay() && mes==verificate.getMonth()){
    console.log('corresponde al mismo dia');
  

   await modelesp8266.findByIdAndUpdate({'_id':id},{

      $pop:{
        Salida:1
        
        }

   }).exec((err,docs)=>{
        if(err) {
            console.log('error no se guardo');
        }else{
   
       console.log('Borrado el ultimo de Salida');
   }
});

await modelesp8266.findByIdAndUpdate({'_id':id},{

  $push:{
    Salida:new Date()
    
    }

}).exec((err,docs)=>{
    if(err) {
        console.log('error no se guardo');
    }else{

   console.log('Guardado con exito Salida actual');
 }
 });
}

}//else{
      res.send('Pa');
    
}



async function calcularBiometrico(req,res){ //////////////BASICO NO HACE USO DE LOS MINUTOS ..... 
  const ide=req.params;
  const id=ide.id;
  console.log(id);

 const modelEntrada=await modelesp8266.findById({_id:id},{_id:false, Entrada:true});
 const modelSalida=await modelesp8266.findById({_id:id},{_id:false, Salida:true});
 const modelDescuento=await modelesp8266.findById({_id:id},{_id:false, Descuento:true});

 const entrada=modelEntrada.Entrada;
 const salida=modelSalida.Salida;
 const descuento=modelDescuento.Descuento;

 
 const arrayentrada=[];
 const arraysalida=[];
 const arraydescuento=[];

 const Configfecha=await configEmpleado.findById({'_id':'65977e749643a5597c95067c'});
 //ff23ff23ff23ff23ff23ff23
 const hourSal=parseInt((Configfecha.horasalida).slice(0,2)); 
 const hour=parseInt((Configfecha.horaentrada).slice(0,2)); 
 const descuentodia=Configfecha.descuento;
 const pagohora=Configfecha.pagohora;
 if(entrada.length== 0){
 //  res.send('no se encontro valores para calcular');
   return res.render('nofound',{title:'no se encontro valores para calcular'});
 }else{
 if(entrada.length== salida.length){

    for(let en of  entrada){
      
      if(en.getHours()==hour){
        console.log('entro a hora');
      //  console.log(en.getHours() +" "+hour);
        arrayentrada.push(en.getHours());
      }else{
        console.log('no entro a hora');
          arrayentrada.push(hour);
      }
     }
   //console.log(arrayentrada);
var pos=0;
     for(let sa of  salida){
      
    if(sa.getHours()==hourSal){
      console.log('salio a hora');
      arraysalida.push(sa.getHours());

    //  console.log(sa.getHours()+"  " +pos +"  "+entrada[pos].getHours());
      pos++;
//console.log();
    }else{
     
      if(sa.getHours()==0 && sa.getMinutes()==0 && sa.getSeconds()==0){
        console.log('no marco salida');
       // const inpu=entrada[pos];
          arraysalida.push(arrayentrada[pos]);
          pos++;

      }else{
      console.log('salio muyy tarde descuento');
      arraysalida.push(arrayentrada[pos]);
      pos++;
      }
    }
      
     }
     console.log("sarrayentrada"+arrayentrada);
     console.log("sarraysalida"+arraysalida);
      for(let de of  descuento){
        arraydescuento.push(de);
      }

    console.log(arraydescuento);
   // console.log(Array.isArray(arrayentrada))
   // console.log(arrayentrada+" "+arraysalida+" "+arraydescuento)
    const arraydif=[];
  for(let i=0;i<arrayentrada.length;i++){

    arraydif.push(arraysalida[i]-arrayentrada[i]);
    
  }
  console.log(arraydif)

  var suma=0;
  for(let data of arraydif){
    suma= suma+data;
  }
  var sumadescuento=0;
  for(let data of descuento){

    sumadescuento= sumadescuento+data;
   
    
  }
  //console.log(suma);
  //console.log(sumadescuento);
  const user=await modelesp8266.findById({_id:id});
   //console.log(user.nombre)

   console.log('suma del arreglo total horas'+"  "+suma);
   console.log('suma de descuentos'+"  "+sumadescuento);
   console.log('config descuento por falta por dia'+"  "+descuentodia);
   console.log('pago por hora'+"  "+pagohora);
    const resul= (suma*pagohora)-(descuentodia*sumadescuento);
  const send={
    title: `Reporte Básico`,
    descripcion:`El presente documento corresponde al usuario ${user.nombre} ${user.apellidos}, con carnet 
    ${user.carnet}, número de teléfono ${user.telefono} y reside en la dirección  ${user.direccion}, fecha de creación de usuario es el ${user.fecha}`,

    Horastrabajo:'Horas trabajo',
    count:`${user.nombre} ${user.apellidos} a trabajado ${suma} horas, durante ${entrada.length} días`,
    descuento:'Descuento',
    descuento1:`${user.nombre} ${user.apellidos} llego ${sumadescuento} días tarde, el descuento por día es ${descuentodia} Bs`,
    pagohora:'Pago por hora',
    pagohora1:`${user.nombre} ${user.apellidos} recibe un pago de ${pagohora} Bs por hora`,
    resultado1:'Pago final',
    resultado2:`Se le debe pagar a ${user.nombre} ${user.apellidos} el monto total de ${resul} Bs`,
    data:user
  }

   console.log('resultado total a pagar'+"  "+ resul);


   res.render('reporteBasic',send);

 }else{ // sino es que hay dupicados entonces habra que eliminar los duplicados
  return res.render('nofound',{title:'hubo un problema en los registros'});
 console.log('El sistema ah sido hackeado jajajajaja no are ningun proceso');
 }
}

 // res.send('fin');
 // console.log(modelEntrada.Entrada[0]);
  //console.log(entrada);
 // for(data in entrada)
  //console.log(entrada+" "+ salida +" "+ descuento);

}


async function calcularBiometricoPro(req,res){
  const ide=req.params;
  const id=ide.id;
  console.log(id);

 const modelEntrada=await modelesp8266.findById({_id:id},{_id:false, Entrada:true});
 const modelSalida=await modelesp8266.findById({_id:id},{_id:false, Salida:true});
 const modelDescuento=await modelesp8266.findById({_id:id},{_id:false, Descuento:true});

 const entrada=modelEntrada.Entrada;
 const salida=modelSalida.Salida;
 const descuento=modelDescuento.Descuento;

 
 const arrayentrada=[];
 const arraysalida=[];
 const arraydescuento=[];

 const Configfecha=await configEmpleado.findById({'_id':'65977e749643a5597c95067c'});
 // ff23ff23ff23ff23ff23ff23
 const hourSal=parseInt((Configfecha.horasalida).slice(0,2)); 
 const hour=parseInt((Configfecha.horaentrada).slice(0,2)); 
 const descuentodia=Configfecha.descuento;
 const pagohora=Configfecha.pagohora;
 if(entrada.length== 0){
  return res.render('nofound',{title:'no se encontro valores para calcular'});
 }else{
 if(entrada.length== salida.length){

    for(let en of  entrada){
      
      if(en.getHours()==hour){
      //  console.log(en.getHours() +" "+hour);
        arrayentrada.push((en.getHours()*100)+en.getMinutes());
     }
    }
    console.log(arrayentrada)

var pos=0;
     for(let sa of  salida){
      
    if(sa.getHours()==hourSal){
      console.log('entro a guardar aunque no deberia');
      arraysalida.push((sa.getHours()*100)+ sa.getMinutes());

      pos++;
//console.log();
    }else{
    //  console.log(sa.getHours() +" "+sa.getMinutes()+" "+sa.getSeconds());
      if(sa.getHours()==0 && sa.getMinutes()==0 && sa.getSeconds()==0){
       // const inpu=entrada[pos];
         console.log('entro a 00 00 00');
          arraysalida.push(((entrada[pos].getHours())*100)+entrada[pos].getMinutes());
          pos++;

      }else{
     // arraysalida.push(hourSal);
     arraysalida.push(((entrada[pos].getHours())*100)+entrada[pos].getMinutes());
     console.log('no salio a la hora determinada, pero si marco hackeo el sistema jajaja');
      pos++;
      }
    }
      
     }

     console.log(arraysalida)


      for(let de of  descuento){
        arraydescuento.push(de);
      }

    //console.log(salida);
   // console.log(Array.isArray(arrayentrada))
   // console.log(arrayentrada+" "+arraysalida+" "+arraydescuento)
    const arraydif=[];
  for(let i=0;i<arrayentrada.length;i++){

    arraydif.push(arraysalida[i]-arrayentrada[i]);
    
  }
  console.log(arraydif)

  var suma=0;
  for(let data of arraydif){
    suma= suma+data;
  }
  var sumadescuento=0;
  for(let data of descuento){

    sumadescuento= sumadescuento+data;
   
    
  }

  const user=await modelesp8266.findById({_id:id});
   //console.log(user.nombre)

   console.log('suma del arreglo total horas'+"  "+suma/100);
   console.log('suma de descuentos'+"  "+sumadescuento);
   console.log('config descuento por falta por dia'+"  "+descuentodia);
   console.log('pago por hora'+"  "+pagohora);
    const resul= ((suma/100)*pagohora)-(descuentodia*sumadescuento);

    const send={
      title: `Reporte Pro`,
      descripcion:`El presente documento corresponde al usuario ${user.nombre} ${user.apellidos}, con carnet 
      ${user.carnet}, número de teléfono ${user.telefono} y reside en la dirección  ${user.direccion}, fecha de creación de usuario es el ${user.fecha}`,
  
      Horastrabajo:'Horas trabajo',
      count:`${user.nombre} ${user.apellidos} a trabajado ${suma} horas, durante ${entrada.length} días`,
      descuento:'Descuento',
      descuento1:`${user.nombre} ${user.apellidos} llego ${sumadescuento} días tarde, el descuento por día es ${descuentodia} Bs`,
      pagohora:'Pago por hora',
      pagohora1:`${user.nombre} ${user.apellidos} recibe un pago de ${pagohora} Bs por hora`,
      resultado1:'Pago final',
      resultado2:`Se le debe pagar a ${user.nombre} ${user.apellidos} el monto total de ${resul} Bs`,
      data:user
    }
   console.log('resultado total a pagar'+"  "+ resul);

   res.render('reportePro',send);

 }else{ // sino es que hay dupicados entonces habra que eliminar los duplicados
  return res.render('nofound',{title:'hubo un problema en los registros'});
 
// console.log('El sistema ah sido hackeado jajajajaja no are ningun proceso');
 }

  }

 // res.render('reporteBasic',locals);

}
  module.exports={
    insertBiometrico,
    calcularBiometrico,
    calcularBiometricoPro
  }

