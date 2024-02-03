  'use strict'

  const modelConfiEmpleados= require('../models/configEmpleados');
  const modellistaEmpleados=require('../models/listaEmpleados');
  const modeluser=require('../models/users');
  const modelbuffer=require('../models/buffer');



  async function calcular(req,res){
  //   const id='5fc57a1bfc813c05c4407bcd';
    const getid=req.params;
    const id=getid.id;
    console.log(id);
    res.send(id);
  
    const dataEntrada= await modellistaEmpleados.findById({'_id':id},{'_id':false,Entrada:true});//.exec((err,docs)=>{
    const dataSalida= await modellistaEmpleados.findById({'_id':id},{'_id':false,Salida:true});  
    const Configfecha=await modelConfiEmpleados.find({});

    console.log(Configfecha);
    console.log(dataEntrada.Entrada);
    console.log(dataSalida.Salida);

    for(let fe of  dataEntrada.Entrada){
      for(let fs of  dataSalida.Salida){
      //  console.log(fe.getHours());
      // console.log(fs.getHours());
      // console.log('diferencia',fs.getHours()-fe.getHours());
      // console.log('-----------------------');



      }
    }
    
    // if(err){
      //   res.status(500).send(console.log('no se encontro al usuario'));

      // }


    // });

  }

  async function Index(req,res){
     // console.log(req.body);
   //  const findbuffer=await modelbuffer.find().limit(1);

    // console.log(findbuffer[0].buffer);
      
 //   const finduse= await modeluser.find({email:findbuffer[0].buffer});
  //  console.log(finduse[0]);
    res.render('perfil',{nombre:' '});

   // const removebuffer=await modelbuffer.remove({_id:findbuffer[0]._id});
    //if(removebuffer){
     //console.log('eliminado con exito');
   // }
  }

  async function contadorEmpleados(req,res){

        const count=await modellistaEmpleados.countDocuments();
        if(count){
              console.log(count);
        }else{console.log('esta vacia la collection');}

  }

  async function GETeditarempleado(req,res){
    let user_id = req.params.id;
    console.log(user_id);
    const docs=await modellistaEmpleados.findById({_id:user_id})
    const locals={
      title : 'Editar Usuario',
      data:docs
    }
    res.render('edit-user',locals)
     //res.send('todo ok');
  }

  async function POSTeditarempleado(req,res){
    let user_id = req.params.id;
    console.log(user_id);
    await modellistaEmpleados.findByIdAndUpdate({_id:user_id},{
      nombre: req.body.nombres_id,
      apellidos:req.body.apellidos_id,
      telefono : req.body.telefono_id,
      carnet: req.body.carnet_id,
      direccion: req.body.direccion_id
    });

    const docslist=await modellistaEmpleados.find({});
    const locals={
      title : 'Lista de empleados editado',
      data:docslist
    }
    res.render('listaEmpleados',locals)

  }

  function GETagregarEmpleados(req,res){

      res.render('add-user');

  }

  async function POSTagregarEmpleados(req,res){

      const usuario = new modellistaEmpleados();
      const params = req.body;
      if(params.nombres_id && params.apellidos_id && params.telefono_id && params.carnet_id  && params.direccion_id ){
          usuario.nombre= params.nombres_id;
          usuario.apellidos= params.apellidos_id;
          usuario.telefono= params.telefono_id;
          usuario.carnet=params.carnet_id;
          usuario.direccion=params.direccion_id;
          usuario.fecha=new Date();
          await usuario.save((err,UsuarioSave)=>{
                if(err){
                  res.render('add-user')
                }else{
                  if(UsuarioSave){
                    modellistaEmpleados.find().exec((err, docs) => {
                          if(err) throw err
                          let locals = {
                          title : 'Se agrego un nuevo usuario',
                          data:docs
                          }
                          console.log(docs)
                          res.render('listaEmpleados',locals)
                      })
                  }else{
                      res.status(200).send({
                            message:"no se ah guardado"
                      });
                  }
                }
              });
      }else{
              res.status(200).send({
              message:"TODOS LOS CAMPOS SON OBLIGATORIOS"
              });
      }
    }

  async function POSTeliminarempleado(req,res){
    let user_id = req.params.id;
    console.log(user_id);

    
    const remove=await modellistaEmpleados.findByIdAndRemove({_id:user_id});

    if(remove){
      console.log('eliminado con exito');
      const docs=await modellistaEmpleados.find()
      const locals={
        title:'Usuario eliminado',
        data:docs
      }
      res.render('listaEmpleados',locals)

    }else{
      console.log('no se elimino nada');
      res.render('perfil');
    }
    }

  function GETlistaEmpleados(req,res){
      modellistaEmpleados.find().exec((err,docs)=>{
      if(err){
          res.status(500).send('error al procesar la solicitud')
      }else{
        //   console.log(modellistaEmpleados.count());
          let locals = {
        title : 'Lista de Empleados',
        data : docs
      }

      res.render('listaEmpleados', locals)
      }


      });
  //res.render('listaEmpleados');
  }

 async function GETconfigEmpleados(req,res){

     // let identificate='ff23ff23ff23ff23ff23ff23'; // id para datos siempre
      let identificate='65977e749643a5597c95067c';
  const mostrar=await modelConfiEmpleados.findOne({_id : identificate});
  console.log(mostrar);
  //const data=mostrar;
          modelConfiEmpleados.findOne({_id : identificate}).exec((err, docs) => {
              if(err) throw err
              let locals = {
                  title : 'Configuracion empleados',
                  data : docs
              }
              const datas='idsdsdsd'
      
              res.render('configEmpleados',locals)
          })
      
  }

  async function POSTconfigEmpleados(req,res){
    // res.send('enviaste informacion a postconfigempleados');
      const horaentrada=req.body.horaentrada; // String
      const horaentradamax=req.body.horaentradamax; //String
      const horasalida=req.body.horasalida; //String
      const minSalida=req.body.minSalida;  //int
      const minentrada=req.body.minentrada; //int
      const descuento=req.body.descuento;//int
      const pagohora=req.body.pagohora;//int

      console.log(horaentrada+" "+horaentrada+" "+horasalida+" "+minSalida+" "+ pagohora);
    /// Condiciones
    let identificate='65977e749643a5597c95067c';

        
     if(pagohora<=0 || descuento<=0 ){
      const findone=await modelConfiEmpleados.findOne({_id : identificate});
      const locals={
        title:'Pago hora y descuento debe ser mayor a 0',
        data:findone
      }
      return res.render('configEmpleados', locals);
     }
     if(minentrada<2 || minentrada>20 || minSalida<2 || minSalida>20 ){
      const findone=await modelConfiEmpleados.findOne({_id : identificate});
      const locals={
        title:'min Entrada y Salida debe ser mayor a 2 min y menor a 20 min',
        data:findone
      }
     return res.render('configEmpleados', locals);
     }
        //console.log(modelEmpleado.horaentrada);
        
        modelConfiEmpleados.findByIdAndUpdate({'_id':identificate },{

          horaentrada:req.body.horaentrada, // String
          horaentradamax:req.body.horaentradamax, //String
          horasalida:req.body.horasalida, //String
          minSalida:req.body.minSalida,  //int
          minentrada:req.body.minentrada, //int
          descuento:req.body.descuento,//int
          pagohora:req.body.pagohora//int

        }).exec((err,docs)=>{
          if(err) throw err
          let locals = {
          data:docs
          }
         // console.log(docs)
          res.render('perfil',locals)

        })
              
  }

async function updates(req,res){
  res.render('updates',{title:'Actualizar'});
}

  module.exports={

      Index,
      GETconfigEmpleados,
      POSTconfigEmpleados,
      GETlistaEmpleados,
      contadorEmpleados,
      GETagregarEmpleados,
      calcular,
      POSTagregarEmpleados,
      POSTeliminarempleado,
      GETeditarempleado,
      POSTeditarempleado,
      updates
  }