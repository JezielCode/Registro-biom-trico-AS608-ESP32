'use strict'
const excel = require('exceljs');
const workbook= new excel.Workbook();


const modelesp8266=require('../models/listaEmpleados');
const configEmpleado=require('../models/configEmpleados');

async function descargarBasicoCalcu(req,res){
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

   descargarBasico(req,res,user,Configfecha,arraydif);



 }else{ // sino es que hay dupicados entonces habra que eliminar los duplicados
  return res.render('nofound',{title:'hubo un problema en los registros'});
 console.log('El sistema ah sido hackeado jajajajaja no are ningun proceso');
 }
}


}

//descargarBasico(req,res,user,Configfecha,arraydif);

async function descargarBasicoCalcuPro(req,res){
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
   const arraynew=[];
   for(let data of arraydif){

    arraynew.push(data/100);
    
  }
  console.log(arraynew);
   descargarBasico(req,res,user,Configfecha,arraynew);
  

 }else{ // sino es que hay dupicados entonces habra que eliminar los duplicados
  return res.render('nofound',{title:'hubo un problema en los registros'});
 
// console.log('El sistema ah sido hackeado jajajajaja no are ningun proceso');
 }

  }

}

async function descargarBasico(req,res,usuario,configempleado,arrayhoras){

  let sheet1= workbook.addWorksheet('info', {views:[{state: 'frozen', xSplit: 1, ySplit:1}]});
  let sheet2 = workbook.addWorksheet('Config');
  let sheet3 = workbook.addWorksheet('Database');
  
  sheet1.columns = [
    { header: "Id", key: "id", width: 5 },
    { header: "Nombre", key: "nombre", width: 32 },
    { header: "Apellido", key: "apellido", width: 32 },
    { header: "Telefono", key: "telefono", width: 15 },
    { header: "Carnet", key: "carnet", width: 12 },
    { header: "Direccion", key: "direccion", width: 45 },
    { header: "Fecha de creacion", key: "fecha", width: 45 }
  ];
  
  
  sheet1.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    sheet1.pageSetup.printArea = 'A1:E1';
    sheet1.getCell('A1').note = `Corresponde al usuario ${usuario.nombre} con el ID: ${usuario._id}, revisar base de datos`;
    
    const rows = [
  // row by array
      {id:1, nombre: usuario.nombre,apellido:usuario.apellidos, telefono:usuario.telefono,carnet:usuario.carnet, direccion:usuario.direccion, fecha:String(usuario.fecha)}
    ];
    const index=['A1','B1','C1','D1','E1','F1','G1',]
  
    sheet1.mergeCells('B2:G2');
  
    for(let data of index){
      sheet1.getCell(data).alignment = { vertical: 'middle', horizontal: 'center' };
    }
    
    
    //for(let i=0;i<=10;i++){
      sheet1.addRows(rows);
      sheet1.mergeCells('B4:G4');
      sheet1.mergeCells('C6:F11');
  
      sheet1.getCell('C6').value=`La empresa SaltoC proporciona la siguiente informacion del usario ${usuario.nombre},con el ID: ${usuario._id}`;
      
      sheet1.getCell('C6').alignment = { vertical: 'middle', horizontal: 'center' };
    
      sheet1.getCell('C6').border = {
          top: {style:'double', color: {argb:'FF00FF00'}},
          left: {style:'double', color: {argb:'FF00FF00'}},
          bottom: {style:'double', color: {argb:'FF00FF00'}},
          right: {style:'double', color: {argb:'FF00FF00'}}
        };
        sheet1.protect('the-password',{selectLockedCells:true});
    //}
  
  sheet2.mergeCells('C2:F2');
  sheet2.getCell('C2').value='Configuracion de empleados';
  sheet2.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center' };
  //sheet1.getCell('A1').note 
  sheet2.mergeCells('B4:C4');
  sheet2.getCell('B4').value='HORA DE ENTRADA';
  sheet2.mergeCells('B6:C6');
  sheet2.getCell('B6').value='HORA DE SALIDA';
  sheet2.mergeCells('B8:C8');
  sheet2.getCell('B8').value='PAGO POR HORA';
  sheet2.mergeCells('B10:C10');
  sheet2.getCell('B10').value='DESCUENTO';
  sheet2.getCell('B10').note = 'El descuento corrresponde al momento de ingresar tarde cuando, mientras si no maarco se considera dia no trabajado';
    
  sheet2.getCell('F4').value=configempleado.horaentrada;
  sheet2.getCell('F6').value=configempleado.horasalida;
  sheet2.getCell('F8').value=configempleado.pagohora;
  sheet2.getCell('F10').value=configempleado.descuento;
  
  sheet2.getCell('F4').border = {
      top: {style:'double', color: {argb:'FF00FF00'}},
      left: {style:'double', color: {argb:'FF00FF00'}},
      bottom: {style:'double', color: {argb:'FF00FF00'}},
      right: {style:'double', color: {argb:'FF00FF00'}}
    };
    sheet2.getCell('F6').border = {
      top: {style:'double', color: {argb:'FF00FF00'}},
      left: {style:'double', color: {argb:'FF00FF00'}},
      bottom: {style:'double', color: {argb:'FF00FF00'}},
      right: {style:'double', color: {argb:'FF00FF00'}}
    };
    sheet2.getCell('F8').border = {
      top: {style:'double', color: {argb:'FF00FF00'}},
      left: {style:'double', color: {argb:'FF00FF00'}},
      bottom: {style:'double', color: {argb:'FF00FF00'}},
      right: {style:'double', color: {argb:'FF00FF00'}}
    };
    sheet2.getCell('F10').border = {
      top: {style:'double', color: {argb:'FF00FF00'}},
      left: {style:'double', color: {argb:'FF00FF00'}},
      bottom: {style:'double', color: {argb:'FF00FF00'}},
      right: {style:'double', color: {argb:'FF00FF00'}}
    };
    sheet2.protect('the-password',{selectLockedCells:true});
  
  /////////  desde aqui empieza hoja 3 database
  
  
    sheet3.mergeCells('G1:L1');
    sheet3.getCell('G1').value='Registro de entradas y salidas';
    sheet3.getCell('G1').alignment = { vertical: 'middle', horizontal: 'center' };
    sheet3.getCell('G1').border = {
      top: {style:'double', color: {argb:'FF00FF00'}},
      left: {style:'double', color: {argb:'FF00FF00'}},
      bottom: {style:'double', color: {argb:'FF00FF00'}},
      right: {style:'double', color: {argb:'FF00FF00'}}
    };
    sheet3.getCell('G1').font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: true,
      bold: true
    };
  
    sheet3.columns=[
    { header: "Entradas", key: "entrada", width: 47 },
    { header: "Salidas", key: "salida", width: 47 },
    { header: "Horas trabajo", key: "horastrabajo", width: 15 },
    { header: "Descuento", key: "descuento", width: 15 },
    { header: "Pago por hora", key: "Pagoporhora", width: 15 },
    { header: "Total", key: "total", width: 15 }
  
    ]
    sheet3.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  
    
    const dataentrada=usuario.Entrada;
    const datasalida=usuario.Salida;
    const datadescuento=usuario.Descuento;
  
  
      for(let i=0;i<dataentrada.length;i++){
      
        sheet3.addRow({entrada: String(dataentrada[i]), salida:String(datasalida[i]),descuento:datadescuento[i]*configempleado.descuento,horastrabajo:arrayhoras[i]});
        // sheet3.insertRow(1,{total: 23});
      }
      sheet3.getCell('E2').value=configempleado.pagohora;
      //const getsheet2
      sheet3.getCell('A2').name = 'PrimerValor';
    // sheet3.getCell('A7').value={formula:'=SUM(E2:E4)'};
      sheet3.getCell('F2').value={formula:'=(SUM(E:E)*SUM(C:C))-SUM(D:D)'};
    //  sheet3.getCell('A8').value = { sharedFormula: 'A7'};
    const namefile=usuario.nombre+'.xlsx';
    
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + namefile);
    workbook.xlsx.write(res)
        .then(function (data) {
            res.end();
            workbook.removeWorksheet(sheet1.id);
            workbook.removeWorksheet(sheet2.id);
            workbook.removeWorksheet(sheet3.id);
            console.log('File write done........');
        });
  
    
  }

module.exports={
    descargarBasicoCalcu,
    descargarBasicoCalcuPro
}