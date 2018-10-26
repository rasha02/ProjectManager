var express=require('express');
var cors=require('cors');

var admin=require('./router/admin');
var client=require('./router/client');
var employee=require('./router/employee');
var absence=require('./router/absence');
var project=require('./router/project');
var document=require('./router/document');
var expenses=require('./router/expenses');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app= express();
app.use(cors());


 //parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator());
app.use(expressSession({secret: 'max', saveUninitialized: true, resave:true}));

// parse application/json
//app.use(bodyParser.json())


app.use('/admin', admin);
app.use('/employee', employee);
app.use('/absence',absence);
app.use('/client', client);
app.use('/project', project);
app.use('/document', document);
app.use('/expenses', expenses);



app.use('/', function(req,res){
  res.send("Welcome to my sever")
});

app.listen(3000,function() {

    console.log("ok");

})
