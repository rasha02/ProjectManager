var mongoose= require('mongoose');
var Schema= mongoose.Schema;


var ExpModelSchema = new Schema({
  expname: String,
  expmonth:String,
  expyear:String,
  expdayNbr:Number,
  expetat: String,
  expvalidation:Boolean,
  expvalidationExpert:Boolean,
  expcomment:String,

});

var ExpModel= mongoose.model('ExpModel', ExpModelSchema);

module.exports= ExpModel;
