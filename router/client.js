var express = require('express');
var clientModel = require('../models/clientModel');
var db = require('../models/db');


var router = express();


//******************** Get all users **********************
router.get('/', function (req, res) {

  clientModel.find({}, function (err, result) {
    res.send(result)
  })

})


// *************************** get client by id ****************

router.get('/getClientbyProj',function(req,res) {

  console.log(req.query.idclient)

  clientModel.findById({_id: req.query.idclient}, function (err, client) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(client)
    }
  })
})



// ************************* Add Client  ********************
router.post('/addClient', function (req , res) {
  console.log(req.query)

  var client = new clientModel({firstname: req.query.firstname,
            lastname: req.query.lastname,
            email: req.query.email,
            company: req.query.company,
            phone: req.query.phone,
            clientid: req.query.clientid,
            address: req.query.address
          });

  client.save(function (err) {
    if (err) {
      res.send({state: false})
    }
    else {
      res.send({state: true})
    }
  })

})


//*****************************




module.exports=router;
