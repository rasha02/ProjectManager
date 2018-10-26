var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ExpensesModelSchema = new Schema({
  expday: String,
  exptype: String,
  expdescription:String,
  expdevice:String,
  expmontant: String,
  expfixed: []

});

var ExpensesModel= mongoose.model('ExpensesModel', ExpensesModelSchema);



module.exports= ExpensesModel;
