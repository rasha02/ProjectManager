var mongoose =require('mongoose');
//Set up default mongoose connection
var mongoDB ='mongodb://127.0.0.1/myDemo2';
mongoose.connect(mongoDB);
//Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the defauult connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
