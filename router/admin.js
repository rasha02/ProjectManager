var express = require('express');
var adminModel=require('../models/adminModel');
var db=require('../models/db');
var bodyParser = require('body-parser');
var employeeModel = require('../models/employeeModel');

var router = express();

router.use(bodyParser.urlencoded({ extended: false }))


//************************ Get all admins ***************************
router.get('/', function (req, res) {

  adminModel.find({},function (err, result) {
    res.send(result)
  })

})



//****************** find admin by his email or password ********************

router.post('/login', function (req, res) {

  adminModel.find({email: req.query.email, password: req.query.password},function (err, admin) {

    console.log(admin)
    console.log(admin.length)
    if(admin.length!=0) {
      res.send({
        auth: true,
        user: admin , role: "admin"
      })
    }
      else(

      employeeModel.find({email: req.query.email, password: req.query.password},function (err, emp) {
        if (emp.length != 0) {
          res.send({
            auth: true,
            user: emp, role: "employee"
          })
        }
        else (
          res.send({
            auth: false,

          }))
      })
    )
  })

})


// ******************************* Add a new admin ******************************

router.post('/addAdmin', function (req, res) {

  console.log(req.query)

  var admin= new adminModel({name: req.query.name, email: req.query.email, password: req.query.password});
  //save the new model
  admin.save(function (err) {
    if(err){
      res.send({"state": "error"})
    }
    ///saved
    else res.send({"state": "ok"})
  })
})


//*************************** update an admin ***************************

router.put('/updateAdmin/:id', function (req, res) {
  console.log(req.body)

      adminModel.findByIdAndUpdate(req.params.id,{
        name: req.query.name,
        email: req.query.email,
        password: req.query.password

      }, {new:true}, function (err) {

        if(err){
          res.send({"state": "error"})
        }
        else res.send({"state": "ok"})
      })

})



//************************** Delete an admin ***********************

router.get('/removeAdmin', function (req, res) {

  adminModel.remove({_id: req.query.id}, function (err) {

    if(err){
      res.send({"state": "error"})
    }
    else res.send({"state": "ok"})
  })

})





module.exports=router;
