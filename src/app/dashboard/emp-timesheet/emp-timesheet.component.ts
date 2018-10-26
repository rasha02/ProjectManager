import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emp-timesheet',
  templateUrl: './emp-timesheet.component.html',
  styleUrls: ['./emp-timesheet.component.css']
})
export class EmpTimeSheetComponent implements OnInit {
  periodes;
  nbr;
  newmonth;

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  constructor(public docserv : DocumentService , public router:Router) {
    localStorage.getItem('iduser')
    this.getperiode(localStorage.getItem('iduser'))

  }

  ngOnInit() {
  }


  getperiode(iduser){
    console.log(iduser)
    this.periodes=[]
    this.docserv.getperiode(iduser).subscribe( data => {
           console.log(data['length'])


      for(var j=data['length']-1 ; j>=0; j--){
        this.periodes.push(data[j])
      }
      this.nbr=this.periodes.length
      if(this.nbr != 0){
         for(var i=0 ;i<this.monthNames.length ; i++){

          if(this.periodes[0].month == this.monthNames[i]){

          if(i== 11){
          this.newmonth=this.monthNames[0]+ " "+ (Number(this.periodes[0].year)+1)
          }else{
          this.newmonth=this.monthNames[i+1]+ " "+ this.periodes[0].year
          }

          }
        }

      }else{
      let date = new Date()
        var month = date.getMonth()
        var year = date.getFullYear()
       this.newmonth=this.monthNames[month]+" "+ year
      }

    })


  }





}
