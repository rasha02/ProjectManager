var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var ClientModelSchema = new Schema({
  firstname: String,
  lastname: String,
  company: String,
  email: {type: String,unique:true},
  phone: String,
  clientid: String,
  address: String


});

//Compile model from schema
var ClientModel = mongoose.model('ClientModel', ClientModelSchema);


module.exports=ClientModel;
