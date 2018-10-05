var mongoose= require('mongoose');
var Schema= mongoose.Schema;


var FilesModelSchema = new Schema({
  filename: String,
});

var EmployeeModelSchema = new Schema({
  avatar: String,
  empid: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  joindate: String,
  role: String
 });
var ActivityModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  idemp:String,
  name:String,
  etat: String,
  comment: String,
  files:[FilesModelSchema]

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
  activity:[ActivityModelSchema],
  emps : [EmployeeModelSchema]
});



var ProjectModel= mongoose.model('ProjectModel', ProjectModelSchema);

module.exports= ProjectModel;
