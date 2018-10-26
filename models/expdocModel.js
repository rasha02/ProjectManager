var mongoose= require('mongoose');
var Schema= mongoose.Schema;


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

var ExpdocModel= mongoose.model('ExpdocModel', ExpdocModelSchema);

module.exports= ExpdocModel;
