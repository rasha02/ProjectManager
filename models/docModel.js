var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var FilesModelSchema = new Schema({
  filename: String,
});
var DocModelSchema = new Schema({
  name: String,
  month:String,
  year:String,
  dayNbr:Number,
  etat: String,
  validation:Boolean,
  validationExpert:Boolean,
  comment:String,
  files: [FilesModelSchema],

});

var DocModel= mongoose.model('DocModel', DocModelSchema);

module.exports= DocModel;
