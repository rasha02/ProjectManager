var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var ProjectModelSchema = new Schema({
  name  : String,
  docs: []
});

var UserModelSchema = new Schema({
    name: String,
    email: String,
    password: String,
    projs: [ProjectModelSchema]
  });

//Compile model from schema
var UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports=UserModel;
