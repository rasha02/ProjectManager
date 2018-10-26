var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var FixedExpModelSchema = new Schema({

  fixexpdays: [],
  fixexptype: String,


});

var FixedExpModel= mongoose.model('FixedExpModel', FixedExpModelSchema);



module.exports= FixedExpModel;
