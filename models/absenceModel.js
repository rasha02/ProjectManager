var mongoose= require('mongoose');
var Schema= mongoose.Schema;


var AbsenceModelSchema = new Schema({
  absencetype:String,
  iduser:String,
  fromdate:String,
  todate:String,
  description: String,
  etat: String,
  reason:String,
  validation:Boolean

});

var AbsenceModel= mongoose.model('AbsenceModel', AbsenceModelSchema);

module.exports= AbsenceModel;
