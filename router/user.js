var express = require('express');
var userModel = require('../models/userModel');
var projectModel = require('../models/projectModel');
var db = require('../models/db');


var router = express();


//******************** Get all users **********************
router.get('/', function (req, res) {

  userModel.find({}, function (err, result) {
    res.send(result)
  })

})



module.exports = router;
