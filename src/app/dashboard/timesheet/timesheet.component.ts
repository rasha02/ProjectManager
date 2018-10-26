import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {ProjectService} from '../../services/project.service';
import "rxjs/add/observable/from"
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  activities;
  iduser;
  iddoc;
  etat;
  validation;
  validationExpert;
  dayNbr;
  name;
  comment;
  projects;
  tabday;
  valeur;
  filesToUpload: Array<File>;
  types;
  user;
  files;
  idproj;
  type;
  tabact;
  dayss;
  dayofweek;
  ngtabday;
  docbyperiode;
  daysn;
  exist;
  datevalidation;
  isDisable = false;
  constructor(public docser: DocumentService, public route: ActivatedRoute, public  empserv: EmployeeService , public projser : ProjectService) {
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

    this.getWeeksStartAndEndInMonth(3, 2018, 1)
    this.getWeeksStartAndEndInMonth(10, 2018, 1)
    this.getWeeksStartAndEndInMonth(9, 2018, 1)
    this.iduser = localStorage.getItem('iduser')
    console.log(JSON.parse(localStorage.getItem('user'))[0])
    this.user = JSON.parse(localStorage.getItem('user'))[0]
    this.iddoc = this.route.snapshot.params['iddoc']
    console.log(this.iddoc)
    this.etat = this.route.snapshot.params['etat']
    if(this.etat == "En attente de validation"){
      this.isDisable=true;
    }
    this.dayNbr = this.route.snapshot.params['dayNbr']
    console.log(this.dayNbr)
    this.tabday = []
    this.ngtabday = []

    console.log(this.tabday)
    this.name = this.route.snapshot.params['name']
    console.log(localStorage.getItem('iduser'))
    this.empserv.getProjsByEmp(localStorage.getItem('iduser')).subscribe(projects => {
      console.log(projects)
      this.projects = projects
    })

    if (this.iddoc != undefined) {
      this.daysn=[]
      this.tabact=[]
      this.docser.getdocbyperiode(localStorage.getItem('iduser'), this.iddoc, this.name).subscribe(data => {
        console.log(data['activity'])
        this.docbyperiode = data
        //this.tabact = data['activity']
        this.validation=data['doc'].validation
        this.files=data['doc'].files
        console.log(this.files)
        if( this.validation){
          this.isDisable=true;
        }
        this.validationExpert=data['doc'].validationExpert
        this.datevalidation= data['doc'].datevalidation
        if(data['doc'].comment == undefined){
          this.comment=""
        }else{
          this.comment = data['doc'].comment

        }
         for (var c1 = 0; c1 < data['activity'].length; c1++) {
           console.log(data['activity']);
           for (var c3 = 1; c3 <= data['doc'].dayNbr; c3++) {
             this.exist = false;
             for (var c2 = 0; c2 < data['activity'][c1]['daysofproduction'].length; c2++) {
               if (String(c3) == data['activity'][c1]['daysofproduction'][c2].day) {
                 this.daysn.push({'day': c3, value: '1'});
                 this.exist = true;
               }
               else if (c2 == data['activity'][c1]['daysofproduction'].length - 1 && this.exist == false) {
                 this.daysn.push({'day': c3});
               }
             }
           }
            if(data['activity'][c1]['projname']== 'Interne'){
                this.tabact.push({
                  'dayofproduction': data['activity'][c1]['daysofproduction'],
                  'days': this.daysn,
                  'name': this.name,
                  'type': data['activity'][c1]['type'],
                  'idproject': "Interne"
                });
            }
           if(data['activity'][c1]['projname']== 'Absence'){
               this.tabact.push({
                 'dayofproduction': data['activity'][c1]['daysofproduction'],
                 'days': this.daysn,
                 'name': this.name,
                 'type': data['activity'][c1]['type'],
                 'idproject': "Absence"
               });
           }
           if(data['activity'][c1]['projname'] != 'Absence' && data['activity'][c1]['projname'] != 'Interne' ){
              this.tabact.push({
                'dayofproduction': data['activity'][c1]['daysofproduction'],
                'days': this.daysn,
                'name': this.name,
                'type': data['activity'][c1]['type'],
                'idproject': data['activity'][c1]['projid']
              });
            }

           this.daysn = [];
             console.log(this.tabact);
         }
        for (var k = 1; k < Number(this.dayNbr) +1; k++) {
          this.tabday.push({day: k})
        }
       })

       // console.log(this.tabact)


        /* this.tabact=[{'dayofproduction': [{day: "1", indice: 0}
             , {day: "8", indice: 1}
         ,{day: "17", indice: 2}
         , {day: "20", indice: 3}] , 'days':[{day: 1, value: "1"}
             , {day: 2}
         ,{day: 3}
         , {day: 4}
         , {day: 5}
         , {day: 6}
         , {day: 7}
         , {day: 8, value: "1"}
         , {day: 9}
         , {day: 10}
         , {day: 11}
         , {day: 12}
         , {day: 13}
         , {day: 14}
         , {day: 15}
         , {day: 16}
         , {day: 17, value: "1"}
         , {day: 18}
         , {day: 19}
         ,{day: 20, value: "1"}
         , {day: 21}
        , {day: 22}
         , {day: 23}
         , {day: 24}
         , {day: 25}
         , {day: 26}
         ,{day: 27}
         , {day: 28}
         , {day: 29}
         , {day: 30}] , 'idproject': "5badf023797152056c2e22ff",
           'type': "normale"}] */

        //this.tabact=[]

    } else {
      this.tabday = []
      for (var ka = 1; ka < dayNbrr; ka++) {
        this.tabday.push({day: ka})
      }

      this.tabact = []

    }
  }

  ngOnInit() {
  }

  addactivity() {

   //this.activities = [{"idproject": this.idproj, "dayofproduction": ["1"], "type": this.type},
     // {"idproject": "5badf00b797152056c2e22fe", "dayofproduction": ["2", "8"], "type": "test"}]
    //console.log(this.activities)

    console.log(this.tabact)

    if(this.iddoc == undefined){
    this.docser.createdoc(localStorage.getItem('iduser')).subscribe(data => {
      console.log(data)
      console.log(data['docs']._id)
      console.log(this.comment)
      this.docser.saveDoc(localStorage.getItem('iduser'), data['docs']._id, this.comment, this.tabact).subscribe(data => {
        console.log("done")
        console.log(data['docs'][data['docs'].length -1]['_id'])
        console.log(data['docs'].length -1)
        this.iddoc= data['docs'][data['docs'].length -1]['_id']
        console.log(this.iddoc)
        this.name=data['docs'][data['docs'].length -1]['name']
      })

    })
      this.etat="enregistré et non validé"
  }else{


      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      console.log(files)
      if(files == undefined){
        formData.append("pdf", "undefined", "undefined");
      }else{
        formData.append("pdf", files[0], files[0]['name']);
      }

      console.log(formData)
          this.docser.save2Doc(localStorage.getItem('iduser'), this.iddoc, this.comment, this.tabact , this.name ,"enregistré et non validé", formData).subscribe(data => {
            console.log("done")
          })

      this.etat="enregistré et non validé"
    }

  }

  validateact(){
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files)
    if(files == undefined){
      console.log("1111")
      formData.append("pdf", "undefined", "undefined");
    }else{
      console.log("222")

      formData.append("pdf", files[0], files[0]['name']);
    }

     console.log(formData)
     console.log(localStorage.getItem('iduser'), this.iddoc, this.comment, this.tabact , this.name)

    this.docser.save2Doc(localStorage.getItem('iduser'), this.iddoc, this.comment, this.tabact , this.name ,"En attente de validation", formData).subscribe(data => {
      console.log("done")
      console.log(data)

    })

    this.validationExpert=false
    this.datevalidation= Date.now()
    this.validation=true
    this.etat="En attente de validation"
    this.isDisable = true;




  }

  gettype(valeur, i) {

    console.log(valeur)
    if (valeur == "Absence") {
      this.types = [
        {tp: "congé"},
        {tp: "maladie"},
        {tp: "congé maternité"}
      ]
    }
    else {
      if (valeur == "Interne") {
        this.types = [
          {tp: "company"},
          {tp: "formation"}
        ]
      }

      else {
        this.idproj = valeur
        this.types = [
          {tp: "normale"},
          {tp: "astreinte (recup en salaire)"},
          {tp: "astriente (recup en congé)"}
        ]

        this.tabact[i].idproject = this.idproj
        console.log(this.tabact)
      }
    }

  }


  savetype(type, i) {
    this.tabact[i].type = type
    console.log(this.tabact)

  }

  addligne() {
    this.tabday = []
    for (var ka = 1; ka < 31; ka++) {
      this.tabday.push({day: ka})
    }
    if (this.iddoc != undefined){
    this.tabact.push({"dayofproduction": [] , "days": this.tabday , "name": this.name})
    }else {

      this.tabact.push({"dayofproduction": [] , "days": this.tabday })
    }
    console.log(this.tabact)
  }


  removeligne(i) {
    this.tabact.splice(i, 1)
    console.log(this.tabact)
  }




  endFirstWeek(firstDate, firstDay) {
    if (!firstDay) {
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


  getdays(i, t, dayofweek) {

    console.log(dayofweek)
    console.log(i, t, dayofweek)
    if (dayofweek == "1") {

      this.dayss.push(String(t))
      //console.log(this.dayss)
      console.log(this.tabact[i])
      console.log(String(t))
      console.log( this.tabact[i].dayofproduction.length)
      this.tabact[i].dayofproduction.push({day: String(t), indice: this.tabact[i].dayofproduction.length})
      //this.dayofweek=""
    }
    console.log(dayofweek)

    if (dayofweek == "") {
      console.log("okkk")

      for (var k = 0; k < this.tabact[i].dayofproduction.length; k++) {
        console.log(this.tabact[i].dayofproduction[k].day)
        console.log(t)
        if (this.tabact[i].dayofproduction[k].day == String(t)) {
          for(var h=this.tabact[i].dayofproduction[k].indice+1 ; h<this.tabact[i].dayofproduction.length ; h++){

            console.log(this.tabact[i].dayofproduction[k].indice)
            console.log(this.tabact[i].dayofproduction.length)
            console.log("done")
            console.log(this.tabact[i].dayofproduction[h].indice)

            this.tabact[i].dayofproduction[h].indice=this.tabact[i].dayofproduction[h].indice -1
          }
          this.tabact[i].dayofproduction.splice(this.tabact[i].dayofproduction[k].indice, 1)
        }
      }
    }
    console.log(this.tabact)
  }


  getdocbyperiode() {
    this.docser.getdocbyperiode(localStorage.getItem('iduser'), this.iddoc, this.name).subscribe(data => {
      console.log(data)
      this.docbyperiode = data
    })

  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }



 captureScreen()
  {
    var data = document.getElementById('main-content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }



  captureScreen2()
  {

    var promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log("Async Work Complete");
        let tab2;
        tab2=[]
        for(var y=0 ; y< this.tabact.length ;y++){
          if(this.tabact[y].idproject != "Absence"  && this.tabact[y].idproject != "Interne" ){
            tab2.push(this.tabact[y])

          }

        }
        this.tabact=tab2
        resolve();
      }, 8000);

    }).then( res =>{


      var data = document.getElementById('main-content');
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('MYPdf.pdf'); // Generated PDF
      });


    });
    return promise;




  }




}

