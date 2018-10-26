var express = require('express');
var expdocModel=require('../models/expdocModel');
var projectModel=require('../models/projectModel');
var employeeModel=require('../models/employeeModel');
var db=require('../models/db');

var path = require('path');
var router = express();
//************************ Get all Exp docs ***************************
router.get('/', function (req, res) {

  expdocModel.find({},function (err, result) {
    res.send(result)
  })

})

//************************************
router.get('/getexpdocs' , function(req , res ) {

  employeeModel.findById(req.query.iduser, function (err, user) {

    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      res.send(user.expdocs)
    }
  })

})
//************************ Create an expenses document *******************

router.get('/createExpDoc' , function(req,res) {

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

      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      this.monthNames=["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      if(emp.expdocs.length == 0){
        var expmonth = date.getMonth()
        var expyear = date.getFullYear()
        var expdayNbr = getDaysInMonth(date.getMonth()+1, date.getFullYear());

      }else{
        console.log(emp.expdocs[emp.expdocs.length -1].expmonth)
        for(var i=0; i<this.monthNames.length ; i++){
          if(this.monthNames[i]== emp.expdocs[emp.expdocs.length -1].expmonth){
            if(i==11){
              expmonth=0
              expyear= Number(emp.expdocs[emp.expdocs.length -1].expyear) +1
            }else{
              expmonth= i+1
              expyear=emp.expdocs[emp.expdocs.length -1].expyear
            }
          }
        }
        var expdayNbr = getDaysInMonth(expmonth+1, expyear);
      }
      var expdoc =new expdocModel(
        {
          expname: this.monthNames[expmonth]+ " " + expyear,
          expmonth: this.monthNames[expmonth],
          expyear: expyear,
          expdayNbr: expdayNbr,
          expetat: "En attente de création",
          expvalidation: false,
          expvalidationExpert: false,

        }
      )
      emp.expdocs.push(expdoc)
    }

    emp.save(function (err , result) {
      if (err) {
        res.send({state: false})
      }
      else {
        res.send({state: true , expdocs: expdoc})
      }
    })
  })
})




//*************************** Save an expenses document ***********************************

router.post("/saveExpDoc", function(req,res){
  //console.log(req.query.activities)
  employeeModel.findById(req.query.iduser , function (err, user){

    if (err) {
      res.send({err: 'there are error'})
    }
    else {
      console.log(user)
      res.send(user)
      for (var i = 0; i < user.expdocs.length; i++) {
        if (user.expdocs[i]._id == req.query.idexpdoc) {
          user.expdocs[i].expetat = "enregistré et non validé"
          user.expdocs[i].expcomment = req.query.expcomment
          user.expdocs[i].expscale = req.query.expscale
          var expname= user.expdocs[i].expname
        }
      }
      var tabproj = JSON.parse(req.query.activities)

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


// ******************** Save an exp document *******************

















module.exports=router;

