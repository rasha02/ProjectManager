var express = require('express');
var docModel=require('../models/docModel');
var projectModel=require('../models/projectModel');
var employeeModel=require('../models/employeeModel');
var db=require('../models/db');
//var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var router = express();

//router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.static(path.join(__dirname, 'filesUploaded')));


var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './router/filesUploaded/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
});

var upload = multer({ storage: storage });


//************************ Get all docs ***************************
router.get('/', function (req, res) {

  docModel.find({},function (err, result) {
    res.send(result)
  })

})



//**************************** Add Document *****************************

router.post('/addDocument', function (req, res) {
  var getDaysInMonth = function (month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
  };
  let date = new Date()
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
this.monthNames=["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  var month = date.getMonth()
  var year = date.getFullYear()
  var dayNbr = getDaysInMonth(date.getMonth(), date.getFullYear());
  var doc = new docModel(
    {

      name: month + " "+year,
      month: this.monthNames[month],
      year: year,
      dayNbr: dayNbr,
      etat:"enregistrer et non validé",
      validation: false,
      validationExpert: false ,
      comment: req.query.comment,
      files: []

    });

  employeeModel.findById(req.query.iduser, function (err, emp) {
    console.log(emp)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      console.log(emp.projs)
      for(var i=0;i<emp.projs.length;i++) {
        if (emp.projs[i]._id == req.query.idproj) {
          emp.projs[i].docs.push(doc)
        }
      }
      emp.save(function (err) {
        console.log(err)

        if (err) {
          res.send({state: false})
        }
        else {
        }
      })
    }
  })

  projectModel.findById(req.query.idproj, function (err, project) {
    console.log(project.docs)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      project.docs.push(doc)
      project.save(function (err) {
        console.log(err)
        if (err) {
          res.send({state: false})
        }
        else {
          res.send({state: true})
        }
      })
    }
  })


})


//******************************** Update document *****************
router.put('/updateDocument', function (req, res) {
  employeeModel.findById(req.query.iduser, function (err, emp) {
    console.log(emp)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      for (var i = 0; i < emp.projs.length; i++) {
        projectModel.findById(req.query.idproj, function (err, projet) {
          console.log(projet.docs)
          for (var j = 0; j < projet.docs.length; j++) {
                if (projet.docs[j]._id==req.query.iddoc){

                  projet.docs[j].name = req.query.name
                  projet.docs[j].validation = req.query.validation
                  projet.docs[j].comment = req.query.comment
                }
          }
          projet.save(function (err) {
            if (err) {
              res.send({state: false})
            }
            else {
              //res.send({state: true})
            }
          })
        })
      }
    }


  })



})
// **************************** Get Docs by employee**************************

router.get('/getDocsByEmpByProj', function (req, res) {

  employeeModel.findById(req.query.iduser, function (err, emp) {
    console.log(emp)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {

      var docbyuser=[]
      this.docbyuser=[]
      for(var  i=0;i<emp.projs.length;i++){
        if( emp.projs[i]._id == req.query.idproj){

          this.docbyuser=emp.projs[i].docs
        }

      }
      res.send( this.docbyuser)

    }
  })
})
// **************************** Get Docs by project**************************

router.get('/getDocsByProject', function (req, res) {

  projectModel.findById(req.query.idproj, function (err, project) {
    console.log(project)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      console.log(project.docs)
      res.send(project.docs)

    }
  })
})


//*******************************Create a document ********************

router.get('/createDoc' , function(req,res) {

  employeeModel.findById(req.query.iduser, function (err, emp) {
    console.log(emp)
    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      var getDaysInMonth = function (month, year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
      };
      let date = new Date()
      var month = date.getMonth()
      var year = date.getFullYear()
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      this.monthNames=["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      var dayNbr = getDaysInMonth(date.getMonth(), date.getFullYear());
      var doc =new docModel(
        {
          name: month+ " " + year,
          month: this.monthNames[month],
          year: year,
          dayNbr: dayNbr,
          etat: "En attente de création",
          validation: false,
          validationExpert: false,
          files: []
        }
       )

      emp.docs.push(doc)
    }
    emp.save(function (err , result) {
      if (err) {
        res.send({state: false})
      }
      else {
        res.send({state: true , docs: doc})
      }
    })


  })


})

//************************* Create Document*********************


router.post("/saveDoc", function(req,res){
console.log(req.query.activities)
employeeModel.findById(req.query.iduser , function (err, user){

  if (err) {
    res.send({err: 'there are error'})
  }
  else {

    console.log(user)
    res.send(user)
    for (var i = 0; i < user.docs.length; i++) {
      if (user.docs[i]._id == req.query.iddoc) {

        user.docs[i].etat = "enregistré et non validé"
        user.docs[i].comment = req.query.comment
        var month= user.docs[i].name
      }
    }
    var tabproj = JSON.parse(req.query.activities)

    console.log(tabproj[1].dayofproduction)
    for(var k=0 ; k<tabproj.length ; k++){
    for (var j = 0; j < user.projs.length; j++) {

        if(user.projs[j]._id == tabproj[k].idproject){
          console.log('testtttttttttt',tabproj[k].dayofproduction)
          user.projs[j].activity.push({ "daysofproduction" : tabproj[k].dayofproduction , "type" : tabproj[k].type , "name": month })
        }
    }
     //res.send({state: true})
     projectModel.findById(tabproj[k].idproject , function(err , project){
     console.log(tabproj)
            //console.log(project)
            if (err) {
              res.send({err: 'there are error'})
            }
            else {
              for(var t =0 ; t<tabproj.length ; t++){
                if(tabproj[t].idproject == project._id ){
                  var tab =tabproj[t]
                }
              }
console.log(tab)
              project.activity.push({"name": month , "idemp": req.query.iduser ,"daysofproduction" : tab.dayofproduction , "type" : tab.type , "etat":"enregistré et non validé" , "comment":req.query.comment})
            }

            project.save(function (err) {
              if (err) {
                res.send({state: false})
              }
              else {
                //res.send({state: true})
              }
            })

          } )





    }


  }


  user.save(function (err) {
    if (err) {
      res.send({state: false})
    }
    else {
     // res.send({state: true})
    }
  })

})


})




router.get('/getperiode' , function(req , res ){

  employeeModel.findById( req.query.iduser , function( err , user ){

    if (err) {
      res.send({err: 'there are error'})
    }
    else {

      res.send(user.docs)

    }
  })


})


router.get('/getdocbyperiode' , function(req, res){

  employeeModel.findById(req.query.iduser , function(err , user){

    if (err) {
      res.send({err: 'there are error'})
    }
    else {
var tab =[]
      this.tab =[]
      for(var i=0 ; i<user.projs.length ; i++){

        for(var j=0 ; j<user.projs[i].activity.length ; j++){

          if(user.projs[i].activity[j].name == req.query.name){
              user.projs[i].activity[j].projname= user.projs[i].name
            console.log(user.projs[i].activity[j])
            this.tab.push(user.projs[i].activity[j])

          }


        }
      }



      for (var j=0 ;j < user.docs.length ; j++){
        if(user.docs[j]._id == req.query.iddoc){
          res.send({ "doc" : user.docs[j] , "activity" : this.tab})
        }

      }
    }


  })




})





module.exports=router;
