import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  activities;
  iddoc;
  etat;
  dayNbr;
  name;
  projects;
  tabday;
  valeur;
  types;
  user;
  idproj;
  type;
  tabact;
  dayss;
  dayofweek;
  ngtabday;
  constructor(public docser : DocumentService , public route : ActivatedRoute , public  empserv : EmployeeService) {
    this.dayss=[]
    this.getWeeksStartAndEndInMonth(3 , 2018,1)
    this.getWeeksStartAndEndInMonth(10 , 2018,1)
    this.getWeeksStartAndEndInMonth(9 , 2018,1)
    localStorage.getItem('iduser')
    console.log(JSON.parse(localStorage.getItem('user'))[0])
    this.user=JSON.parse(localStorage.getItem('user'))[0]
    this.iddoc=this.route.snapshot.params['iddoc']
    console.log(this.iddoc)
    this.etat=this.route.snapshot.params['etat']
    this.dayNbr=this.route.snapshot.params['dayNbr']
    this.tabday=[]
    this.ngtabday=[]
    for(var k=1 ; k<=this.dayNbr; k++){
      this.tabday.push(k)
    }
    for(var j=1 ; j<=this.dayNbr; j++){
      this.ngtabday.push("day"+j)
    }
    this.name=this.route.snapshot.params['name']
console.log(localStorage.getItem('iduser'))
    this.empserv.getProjsByEmp(localStorage.getItem('iduser')).subscribe( projects => {
      console.log(projects)
      this.projects=projects
    })


    if( this.iddoc != undefined){
      this.docser.getdocbyperiode(localStorage.getItem('iduser') , this.iddoc , this.name).subscribe(data => {
        console.log(data)
      })
      this.tabact=[]
    }else{
      this.tabday=[]
      for(var ka=1 ; ka<31; ka++){
        this.tabday.push(ka)
      }

      this.tabact=[]
      this.ngtabday=[]
      for(var ja=1 ; ja<=31; ja++){
      }
    }
  }

  ngOnInit() {
  }

  addactivity(){
    this.activities=[{ "idproject":  this.idproj, "dayofproduction": ["1"], "type": this.type},
      {"idproject":  "5badf00b797152056c2e22fe", "dayofproduction": ["2" , "8"] , "type": "test"}]
    console.log(this.activities)
    console.log(this.tabact)
    this.docser.createdoc(localStorage.getItem('iduser')).subscribe( data => {
      console.log(data)
      console.log(data['docs']._id)
      this.docser.saveDoc(localStorage.getItem('iduser'),data['docs']._id,"test", this.tabact).subscribe( data => {
        console.log("done")
      })

    })
  }


  gettype(valeur,i){
    console.log(valeur)
  if( valeur ==  "Absence") {
  this.types = [
    "congé",
    "maladie",
    "congé maternité"
  ]
}
  else {
    if( valeur ==  "Interne") {
      this.types = [
        "company",
        "formation"
      ]
    }

    else {
   this.idproj= valeur
      this.types = [
        "normale",
        "astreinte (recup en salaire)",
        "astriente (recup en congé)"
      ]

      this.tabact[i].idproject=this.idproj
      console.log(this.tabact)
  }
}

  }

  addligne(){

    this.tabact.push({ "dayofproduction":[]})
    console.log(this.tabact)
  }


  removeligne(i){
    this.tabact.splice(i , 1)
  }

  savetype(type , i){
    this.tabact[i].type=this.type
    console.log(this.tabact)

  }



   endFirstWeek(firstDate, firstDay) {
    if (! firstDay) {
      return 7 - firstDate.getDay();
    }
    if (firstDate.getDay() < firstDay) {
      return firstDay - firstDate.getDay();
    } else {
      return 7 - firstDate.getDay() + firstDay;
    }
  }

  getWeeksStartAndEndInMonth(month, year, start) {
    let weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();

    start = 1;
    let end = this.endFirstWeek(firstDate, 2);
    while (start <= numDays) {
      weeks.push({start: start, end: end});
      start = end + 1;
      end = end + 7;
      end = start === 1 && end === 8 ? 1 : end;
      if (end > numDays) {
        end = numDays;
      }
    }

    console.log(weeks)
    return weeks;
  }



  getdays(i,t, dayofweek){

    console.log(dayofweek)
    console.log(i,t, dayofweek)

    this.dayss.push(String(t))
    console.log(this.dayss)
    console.log(this.tabact[i])

    this.tabact[i].dayofproduction.push(String(t))
    this.dayofweek=""

    console.log(this.tabact)
  }










}
