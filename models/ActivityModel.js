var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ActivityModelSchema = new Schema({
  daysofproduction: [],
  type: String,
  projectname:String,

});

var ActivityModel= mongoose.model('ActivityModel', ActivityModelSchema);



module.exports= ActivityModel;
