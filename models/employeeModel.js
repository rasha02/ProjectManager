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
  datevalidation:String,
  validationExpert:Boolean,
  comment:String,
  files: [],

});
var ExpdocModelSchema = new Schema({
  expname: String,
  expmonth:String,
  expyear:String,
  expscale:String,
  expdayNbr:Number,
  expetat: String,
  expvalidation:Boolean,
  expvalidationExpert:Boolean,
  expcomment:String,

});
var ActivityModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  name:String,
  projname:String,
  projid: String

});
var interneModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  name:String,
  projname:String,
  projid: String

});
var absenceModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  name:String,
  projname:String,
  projid: String

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
var ActualExpModelSchema = new Schema({
  idemp:String,
  actexpday: String,
  actexptype: String,
  actexpdescription:String,
  actexpdevice:String,
  actexpamount: String,

});

var FixedExpModelSchema = new Schema({
  idemp:String,
  fixexpdays: [],
  fixexptype: String,


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
  projs: [ProjectModelSchema],
  interne:[interneModelSchema],
  absence:[absenceModelSchema],
  docs:[ DocModelSchema],
  expdocs:[ExpdocModelSchema],
  actualexps:[ActualExpModelSchema],
  fixedexps:[FixedExpModelSchema]

});


var EmployeeModel = mongoose.model('EmployeeModel', EmployeeModelSchema);

module.exports=EmployeeModel;
