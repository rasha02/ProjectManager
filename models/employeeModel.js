var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;
var FilesModelSchema = new Schema({
  filename: String,
});

var DocModelSchema = new Schema({
  name: String,
  month:String,
  year:String,
  dayNbr:Number,
  etat: String,
  validation:Boolean,
  validationExpert:Boolean,
  comment:String,
  files: [FilesModelSchema],

});
var ActivityModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  name:String,
  projname:String

});
var ProjectModelSchema = new Schema({
  name  : String,
  theclient: String,
  startdate: String,
  enddate: String,
  priority:String,
  rate: Number,
  type:String,
  file: String,
  msg: String,
  activity: [ActivityModelSchema],

});
var EmployeeModelSchema = new Schema({
  avatar: String,
  empid: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  joindate: String,
  role: String,
  docs:[ DocModelSchema],
  projs: [ProjectModelSchema]
});


var EmployeeModel = mongoose.model('EmployeeModel', EmployeeModelSchema);

module.exports=EmployeeModel;
