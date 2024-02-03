'use strict'

const mongoose=require('mongoose');
const app=require('./app');
const PORT= process.env.PORT || 3232;
const usermongo=require('./env.variables.json');

mongoose.connect('mongodb://localhost:27017/nodeServerPUG',{useNewUrlParser:true})

///mongoose.connect(`mongodb+srv://${usermongo.user}:${usermongo.password}@cluster0.akr4i.mongodb.net/nodeBiometrico?retryWrites=true&w=majority`,{useNewUrlParser:true})
   .then(()=>{
       console.log('Conectado a nodeServer base de datsos exitosamente');
       app.listen(PORT,()=>{
          console.log(`Servidor nodeServer corriendo en el puerto ${PORT}`);
       });
})
    .catch(err => console.log(err));