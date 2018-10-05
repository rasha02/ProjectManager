var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var AdminModelSchema = new Schema({
  name: String,
  email: {type: String,unique:true},
  password: String


});

//Compile model from schema
var AdminModel = mongoose.model('AdminModel', AdminModelSchema);


module.exports=AdminModel;
