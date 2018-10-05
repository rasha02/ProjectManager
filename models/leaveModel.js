var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var LeaveModelSchema = new Schema({
  leavetype:String,
  fromdateate: String,
  todateate: String,
  reason: String,
});

//Compile model from schema
var LeaveModel = mongoose.model('LeaveModel', LeaveModelSchema);


module.exports=LeaveModel;
