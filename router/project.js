var express = require('express');
var multer = require('multer');
var projectModel=require('../models/projectModel');
var employeeModel=require('../models/employeeModel');
var db=require('../models/db');
var multer = require('multer');
var path = require('path');

var router = express();
router.use(express.static(path.join(__dirname, 'filesUploaded')));


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './router/filesUploaded')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname)
  }
});
var upload = multer({storage: storage});


//************************ Get all projects *********************************

router.get('/', function (req, res) {
  projectModel.find({},function (err, result) {
    res.send(result)
  })
})

// ************************* Create a new project  ***************************************

router.post('/addProject',upload.single("pdf"), function (req, res) {
  var  project= new projectModel({name: req.query.name,
    theclient:req.query.theclient,
    startdate:req.query.startdate,
    enddate: req.query.enddate,
    priority:req.query.priority,
    rate:req.query.rate,
    type:req.query.type,
    file:req.file.filename,
    msg: req.query.msg

  });
  project.save(function (err) {
    console.log(err)
    if(err) {
      res.send({state:false})
    }
    else {
      res.send({state:true})
    }
  })
})


//************************ Delete a project **********************************

router.get('/removeProject', function (req, res) {
  console.log(req.query)
  projectModel.findById(req.query.idproj, function (err, projet) {

    console.log(projet)
    console.log(projet.emps.length)
    if(projet.emps.length != 0){

    for (var i = 0; i < projet.emps.length; i++) {

      employeeModel.findById(projet.emps[i]._id, function (err, emp) {
        console.log(emp)
        var newprojs = []
        this.newprojs = []
        for (var j = 0; j < emp.projs.length; j++) {

          if (emp.projs[j]._id != req.query.idproj) {
            this.newprojs.push(emp.projs[j])
          }
        }
        emp.projs = this.newprojs
        console.log(emp)
        emp.save(function (err) {
          if (err) {
            res.send({state: false})
          }
          else {
            console.log( 'length:',projet.emps.length )
            console.log('i',i)
            if (i == projet.emps.length ) {
              console.log("done")
              projectModel.remove({_id: req.query.idproj}, function (err) {

                if (err) {
                  res.send({"state": "error"})
                }

                else {
                  //res.send({"state": "ok"})
                }
              })
            }
            //res.send({state: true})
          }
        })
        //console.log(projet.emps.length)


      })
    }
      res.send({"state": "ok"})
    }else{
      console.log(req.query)
      projectModel.remove({_id: req.query.idproj}, function (err) {

        if (err) {
          res.send({"state": "error"})
        }

        else {
          res.send({"state": "ok"})
        }
      })

    }
  })
})


// ******************************* Remove project from employee's list projects ******************

router.get('/removeProjFromListProjByEmp', function (req , res) {

  employeeModel.findById(req.query.iduser, function (err, emp) {
    var listproj = []
    this.listproj = []

    for(var i=0; i < emp.projs.length; i++)
    {
        if (emp.projs[i]._id != req.query.idproj){
           this.listproj.push(emp.projs[i])
        }
    }
    emp.projs= this.listproj
    emp.save(function (err) {
      if (err) {
        res.send({state: false})
      }
      else {
        //res.send({state: true})
      }
    })
  })
  projectModel.findById(req.query.idproj, function (err, projet) {
    console.log(projet)
    var newemp = []
    this.newemp = []
    for (var j = 0; j < projet.emps.length; j++) {

      if (projet.emps[j]._id != req.query.iduser) {
        this.newemp.push(projet.emps[j])
      }
    }
    projet.emps = this.newemp
    projet.save(function (err) {
      if (err) {
        res.send({state: false})
      }
      else {
        res.send({state: true})
      }
    })
  })
})



//************************* Create a new project And affect employee ***************************************

router.post('/addProject/:iduser', function (req, res) {
  employeeModel.findById({_id: req.params.iduser}, function (err,emp) {
    console.log(emp);
    var  project= new projectModel({name: req.body.name, emps: emp});
    project.save(function (err) {
      console.log(err)
      if(err) {
        res.send({state:false})
      }
      else {
        res.send({state:true})
      }
    })
  })
})

// ***************************** Update a Project *****************************
/*
router.put('/updateProject', function (req, res) {
  console.log(req.query)
  projectModel.findByIdAndUpdate(req.query.idproj,
    {
      name: req.query.name,
    }, {new: true}, function (err, project) {
      console.log(project)

      if (err) {
        res.send({"state": "error"})
      }
      else {
        if (project.emps.length > 0) {
          for (var i = 0; i < project.emps.length; i++) {
            employeeModel.findById(project.emps[i]._id, function (req, emp) {
              console.log(emp);
              emp.projs.findOneAndUpdate(req.query.idproj, {name: req.query.name}, function (err) {
                if (err) res.send({"state": "error"})
                else res.send({"state": "ok"})
              })
            })
          }
        }
        res.send({"state": "ok"})
      }
    })
})


*/
  // ***************************** Update a Project *****************************

  router.put('/updateProject', function (req, res) {
    console.log(req.query)
    projectModel.findByIdAndUpdate(req.query.idproj, {
      name: req.query.name,
    }, {new: true}, function (err, result) {

      if (err) {
        res.send({"state": "error"})
      }
      else {
        console.log(result)

        if( result.emps.length != 0) {
          console.log(result)
          console.log(result.emps)
          console.log("here")
          for (var i = 0; i < result.emps.length; i++) {
            employeeModel.findById(result.emps[i]._id, function (err, emp) {
              console.log(emp)
              for (var j = 0; j < emp.projs.length; j++) {
                if (String(emp.projs[j]._id) == String(result._id)) {
                  emp.projs[j].name = req.query.name

                  if (j == emp.projs.length - 1) {
                    console.log("done")
                    emp.save(function (err) {
                      if (err) {
                        //res.send({state: false})
                      }
                      else {
                        //res.send({state: true})
                      }
                    })
                  }
                }
              }

            })
          }
        }

        res.send({state: "true"})

      }
    })
  })

//****************************** affect another project to an employee  ***************************

router.post('/affectProjToEmp/:iduser',function (req,res) {

  projectModel.findById(req.query.idproj , function (err,project) {
    if(err){
      res.send({err:'there are error'})
    }
    else
    {
      employeeModel.findById({_id: req.params.iduser}, function (err,emp) {
        console.log("project:",project);
          project.emps.push(emp)
          emp.projs.push(project)
        console.log(project)
          project.save(function (err) {
            //console.log(err)
            if(err){
              res.send({state:false})
              throw err;
            }
            else{
              console.log(emp)
              emp.save(function (err) {
                //console.log(err)
                if(err){
                  res.send({state:false})
                  throw err;
                }
                else{
                  res.send({state:true})
                }
              })

            }
          })
      })
    }
  })
})

//************************* Get list emps working in the same project ************************

router.get('/listEmpsByProject', function (req, res) {
  projectModel.findById({_id: req.query.idproj}, function (err,project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
        res.send(project.emps)
      }
     })
})

//************************* Get list projects by Employee ************************

router.get('/getProjsByEmp', function (req, res) {
  employeeModel.findById({_id: req.query.iduser}, function (err,emp) {
    console.log(emp)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(emp.projs)
    }
  })
})


//************************* Get number of days in a month ************************

var getDaysInMonth = function(month,year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
};
router.get('/DaysInMonth',function (req,res) {
   let date =new Date()
  var numbDay=getDaysInMonth(date.getMonth(), date.getFullYear());
   res.send({'number day':numbDay})
})



// ************************** affect an activity to a document *********************

router.post('/activityToDoc', function (req, res) {
  projectModel.findById(req.body.idProj, function (err, project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      project.document.activity.push({
        day:req.body.day,
        presence:req.body.presence
      })
      project.save(function (err) {
        if(err){
          res.send({state:false})
          throw err;
        }
        else{
          res.send({state:true})
        }
      })
    }
  })
})

// ************************** upload files to a document ***************************

router.post('/uploadFilesToDoc', upload.array("uploads[]",12),function (req, res) {
  projectModel.findById(req.query.idproj, function (err, project) {
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
   for(var c=0;c<project.document;c++){
     if(project.document[c].month==req.query.month &&  project.document[c].year==req.query.year ){
       project.document[c].files.push(
         {filename:req.files[0].filename}
       )
     }
   }
      project.save(function (err) {
        if(err){
          res.send({state:false})
          throw err;
        }
        else{
          res.send({state:true})
        }
      })
    }
  })
})



module.exports=router;
