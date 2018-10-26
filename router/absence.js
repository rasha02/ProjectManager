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
router.get('/getabsencesByEmp' , function(req , res ){

  absenceModel.find({iduser: req.query.iduser}, function( err , absence ){
    console.log(req.query)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {

      res.send(absence)
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
  etat: "Pending response",
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
    etat: "Pending response",
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
  console.log("idddddddddddddd:")
  console.log(req.query.id)

    absenceModel.findByIdAndUpdate(req.query.id, {
    etat: "Request accepted",

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      res.send({"state": "ok"})
      console.log(result)
    }
  })

})

// ********************** Admin refuse the leave Request *****************

router.put('/refuseLeaveRequestByAdmin',function (req, res) {
console.log("AAAAAAAAAAAAA")
  console.log(req.query.id)
  absenceModel.findByIdAndUpdate(req.query.id, {
    etat: "Request refused",

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      res.send({"state": "ok"})
      console.log(result)
    }
  })

})



// ************************     *********************




module.exports = router;
