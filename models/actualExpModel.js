var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ActualExpModelSchema = new Schema({
  actexpday: String,
  actexptype: String,
  actexpdescription:String,
  actexpdevice:String,
  actexpamount: String,

});

var ActualExpModel= mongoose.model('ActualExpModel', ActualExpModelSchema);



module.exports= ActualExpModel;
