var mongoose= require('mongoose');
var Schema= mongoose.Schema;


var AbsenceModelSchema = new Schema({
  absencetype:String,
  iduser:String,
  start:String,
  end:Number,
  description: String,
  etat: String,
  reason:Boolean,
  validation:Boolean

});

var AbsenceModel= mongoose.model('AbsenceModel', AbsenceModelSchema);

module.exports= AbsenceModel;
