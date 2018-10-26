import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {DocumentService} from '../../services/document.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  iduser;
  idexpdoc;
  projects;
  types;
  user;
  tabday;
  dayNbr;
  name;
  etat;
  tabact;
  tabfix;
  dayss;

  isDisable = false;

  constructor(public empserv:EmployeeService, public route: ActivatedRoute) {
    this.dayss = []

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

    var dayNbrr = getDaysInMonth(date.getMonth()+1, date.getFullYear());


    this.iduser = localStorage.getItem('iduser')
    console.log(JSON.parse(localStorage.getItem('user'))[0])
    this.user = JSON.parse(localStorage.getItem('user'))[0]
    this.idexpdoc = this.route.snapshot.params['idexpdoc']
    console.log(this.idexpdoc)
    this.etat = this.route.snapshot.params['etat']
    if(this.etat == "En attente de validation"){
      this.isDisable=true;
    }
    this.dayNbr = this.route.snapshot.params['dayNbr']
    console.log(this.dayNbr)
    this.tabday = []

    console.log(this.tabday)
    this.name = this.route.snapshot.params['name']

    console.log(localStorage.getItem('iduser'))
    this.empserv.getProjsByEmp(localStorage.getItem('iduser')).subscribe(projects => {
      console.log(projects)
      this.projects = projects
    })


    if (this.idexpdoc != undefined) {






    } else {
      this.tabday = []
      for (var ka = 1; ka < dayNbrr; ka++) {
      this.tabday.push({day: ka})
       }

        this.tabfix = []
     }


  }




  ngOnInit() {
  }

  validate(){

  }

  savetype(type, i) {
    this.tabfix[i].type = type
    console.log(this.tabfix)

  }
  addActligne(){

    this.tabact.push({})
  }

  removeActligne(i) {
    this.tabact.splice(i, 1)
    console.log(this.tabact)
  }
  addFixligne(){
    this.tabday = []
    for (var ka = 1; ka < 31; ka++) {
      this.tabday.push({day: ka})
    }
    if (this.idexpdoc != undefined){
      this.tabfix.push({"dayofexpenses": [] , "days": this.tabday , "name": this.name})
    }else {

      this.tabfix.push({"dayofexpenses": [] , "days": this.tabday })
    }
    console.log(this.tabfix)
  }


   removeFixligne(i) {
     this.tabfix.splice(i, 1)
     console.log(this.tabfix)
   }


  getdays(i, t, dayofweek) {

    console.log(dayofweek)
    console.log(i, t, dayofweek)

    // if (typeof dayofweek == 'number') {
      if (dayofweek == "1") {

          this.dayss.push(String(t))
          //console.log(this.dayss)
          console.log(this.tabfix[i])
          console.log(String(t))
          console.log( this.tabfix[i].dayofexpenses.length)
          this.tabfix[i].dayofexpenses.push({day: String(t), indice: this.tabfix[i].dayofexpenses.length})
          //this.dayofweek=""
    }
      console.log(dayofweek)

    if (dayofweek == "") {
          console.log("okkk")

          for (var k = 0; k < this.tabfix[i].dayofexpenses.length; k++) {
            console.log(this.tabfix[i].dayofexpenses[k].day)
            console.log(t)
            if (this.tabfix[i].dayofexpenses[k].day == String(t)) {
              for(var h=this.tabfix[i].dayofexpenses[k].indice+1 ; h<this.tabfix[i].dayofexpenses.length ; h++){

                console.log(this.tabfix[i].dayofexpenses[k].indice)
                console.log(this.tabfix[i].dayofexpenses.length)
                console.log("done")
                console.log(this.tabfix[i].dayofexpenses[h].indice)

                this.tabfix[i].dayofexpenses[h].indice=this.tabfix[i].dayofexpenses[h].indice -1
              }
              this.tabfix[i].dayofexpenses.splice(this.tabfix[i].dayofexpenses[k].indice, 1)
            }
          }
    }
    console.log(this.tabfix)
  }




  interneCaptureScreen(){

  }

  clientCaptureScreen(){

  }




}
