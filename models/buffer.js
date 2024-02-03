const mongoose = require('mongoose');


const {Schema} = mongoose;


const userSchema = new Schema({
     buffer: String,
   

});


module.exports = mongoose.model('buffer', userSchema);