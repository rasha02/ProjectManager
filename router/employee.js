var express = require('express');
var empModel = require('../models/employeeModel');
var projectModel = require('../models/projectModel');
var db = require('../models/db');
var multer = require('multer');
var path = require('path');

var router = express();
router.use(express.static(path.join(__dirname, 'filesUploaded')));


var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './router/filesUploaded/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });


// ********************* Update Emp avatar *************************
router.put("/uploadAvatar", upload.single("image"), function (req, res) {

    empModel.findByIdAndUpdate(req.query.id, {
      avatar:req.file.filename}, {new: true}, function (err, emp) {
        if (err) {
        res.send({"state": "error"})
      }
      else {
        console.log(emp)
      }
    })

    empModel.findById(req.query.id, function (err, emp) {
      if(emp.projs.length !=  0) {
        console.log(emp)
        for (var i = 0; i < emp.projs.length; i++) {
          console.log(emp.projs[i]._id)
          projectModel.find({_id: emp.projs[i]._id}, function (err, projet) {

            console.log(projet)

            for (var j = 0; j < projet[0].emps.length; j++) {
              if (projet[0].emps[j]._id == req.query.id) {

                projet[0].emps[j].avatar = req.file.filename
              }
            }
            projet[0].save(function (err) {
              if (err) {
                res.send({state: false})
              }
              else {
                //res.send({state: true})
              }
            })
          })
        }
        res.send({state: true})
      }
      })

});


// *********************** Get Emp avatar *******************************

router.get('/getAvatar', function (req,res) {

  console.log(__dirname+"/filesUploaded/"+req.query.img);

  res.sendFile(__dirname+"/filesUploaded/"+req.query.img)
})





//******************** Get all employees **********************

router.get('/', function (req, res) {

  empModel.find({}, function (err, result) {
    res.send(result)
  })

})


// ********************Get Emp by ID **************************

router.get('/getEmpById', function (req,res){

  console.log(req.query.iduser)
  empModel.findById({_id: req.query.iduser}, function (err, emp){
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(emp)
    }
  })
})

//************************* Add a new employee ****************************

router.post('/addEmployee', function (req, res) {

  console.log(req.query)

  var emp = new empModel({
    name: req.query.name,
    email: req.query.email,
    password: req.query.password,
    phone: req.query.phone,
    empid: req.query.empid,
    joindate: req.query.joindate,
    role: req.query.role
     });

  emp.save(function (err) {
    if (err) {
      console.log(err)
      res.send({state: false})
    }
    else {
      res.send({state: true})
    }
  })
})



//*************************** Update Employee ************************

router.put('/updateEmployee',function (req, res) {

  empModel.findByIdAndUpdate(req.query.id, {
    name: req.query.name,
    email: req.query.email,
    phone: req.query.phone,
    empid: req.query.empid,
    joindate: req.query.joindate,
    role: req.query.role,

  }, {new: true}, function (err, result) {

    if (err) {
      res.send({"state": "error"})
    }
    else {
      console.log(result)
    }
  })

  empModel.findById(req.query.id , function(err , emp){
    console.log(emp)
    for(var i=0 ; i<emp.projs.length ; i++){
      console.log(emp.projs[i]._id)
      projectModel.find({_id : emp.projs[i]._id} , function( err , projet){

        console.log(projet)

        for(var j=0 ; j< projet[0].emps.length ;j++){
          if(projet[0].emps[j]._id == req.query.id ){
            projet[0].emps[j].name = req.query.name
            projet[0].emps[j].email = req.query.email
            projet[0].emps[j].phone = req.query.phone
            projet[0].emps[j].empid = req.query.empid
            projet[0].emps[j].joindate = req.query.joindate
            projet[0].emps[j].role = req.query.role

          }
        }
        projet[0].save(function (err) {
          if (err) {
            res.send({state: false})
          }
          else {
            //res.send({state: true})
          }
        })
      })
    }
    res.send({state: true})
  })
})


//************************** Delete an Employee ***********************

router.get('/removeEmployee', function (req, res) {

  empModel.findById(req.query.id , function(err , emp) {
    if(emp.projs.length ==  0) {
      empModel.remove({_id: req.query.id}, function (err ) {
        if(err){
          res.send({"state": "error"})
        }
        else {
          res.send({"state": "ok"})
        }
      })
    }
    else {
      for (var i = 0; i < emp.projs.length; i++) {

        projectModel.findById(emp.projs[i]._id, function (err, project) {
          console.log(project)
          var newemp = []
          this.newemp = []
          for ( var j = 0; j < project.emps.length; j++) {
            if ( project.emps[j]._id != req.query.id ) {
              this.newemp.push(project.emps[j])
            }
          }
          project.emps = this.newemp
          project.save(function (err) {
            if (err) {
              res.send({state: false})
            }
            else {
              //res.send({state: true})
            }
          })
        })

        if(i== emp.projs.length - 1){
          empModel.remove({_id: req.query.id}, function (err ) {

            if(err){
              res.send({"state": "error"})
            }

            else {
              res.send({"state": "ok"})
            }
          })
        }
      }
    }
  })

})










module.exports = router;
