var express = require('express');
var absenceModel = require('../models/absenceModel');
var db = require('../models/db');


var router = express();


//******************** Get all employees **********************
router.get('/', function (req, res) {

  absenceModel.find({}, function (err, result) {
    res.send(result)
  })

})


//************************* Get all Leave Request****************************
router.get('/getabsencebyEmp' , function(req , res ){

  absenceModel.findById( req.query.iduser , function( err , abs ){

    if (err) {
      res.send({err: 'there are error'})
    }
    else {

      res.send(abs)

    }
  })


})


//************************* Add Leave ****************************
router.post('/createLeaveRequest', function (req, res) {
console.log(req.query)

var abs = new absenceModel({
  absencetype:req.query.absencetype,
  iduser:req.query.iduser,
  fromdate:req.query.fromdate,
  todate:req.query.todate,
  description: req.query.description,
  reason:req.query.reason,
  etat: "En attente de reponse",
  validation:false
});

  abs.save(function (err) {
  if (err) {
    console.log(err)
    res.send({state: false})
  }
  else {
    res.send({state: true})
  }
})
})


//*************************** Update Leave Request -Employee- ************************

router.put('/updateLeaveRequest',function (req, res) {

  absenceModel.findByIdAndUpdate(req.query.id, {
    absencetype: req.query.absencetype,
    iduser: req.query.iduser,
    fromdate:req.query.fromdate,
    todate:req.query.todate,
    description: req.query.description,
    reason: req.query.reason,
    etat: "En attente de reponse",
    validation: false

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      console.log(result)
    }
  })
})
// ********************** Admin accept the leave Request *****************

router.put('/acceptLeaveRequestByAdmin',function (req, res) {

  absenceModel.findByIdAndUpdate(req.query.id, {
    etat: "Leave request accepte",

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      console.log(result)
    }
  })

})

// ********************** Admin refuse the leave Request *****************

router.put('/acceptLeaveRequestByAdmin',function (req, res) {

  absenceModel.findByIdAndUpdate(req.query.id, {
    etat: "Leave request refused"

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      console.log(result)
    }
  })

})




module.exports = router;
