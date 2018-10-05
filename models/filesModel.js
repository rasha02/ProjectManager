var mongoose = require('mongoose');
//define schema
var Schema= mongoose.Schema;

var FilesModelSchema = new Schema({
    filename: String,
});

//Compile model from schema
var FilesModel = mongoose.model('FilesModel', FilesModelSchema);


module.exports=FilesModel;
