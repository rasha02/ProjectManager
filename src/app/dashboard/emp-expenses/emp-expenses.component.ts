import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Router} from '@angular/router';
import {ExpensesService} from '../../services/expenses.service';

@Component({
  selector: 'app-emp-expenses',
  templateUrl: './emp-expenses.component.html',
  styleUrls: ['./emp-expenses.component.css']
})
export class EmpExpensesComponent implements OnInit {

  expdocs;
  nbr;
  newmonth;

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  constructor(public expserv : ExpensesService, public router:Router) {
    localStorage.getItem('iduser')

    this.getexpdocs(localStorage.getItem('iduser'))
  }

  ngOnInit() {
  }

  getexpdocs(iduser){
    console.log(iduser)
    this.expdocs=[]
    this.expserv.getexpdocs(iduser).subscribe( data => {

      for(var j=data['length']-1 ; j>=0; j--){
        this.expdocs.push(data[j])
      }
      this.nbr=this.expdocs.length
      if(this.nbr != 0){
        for(var i=0 ;i<this.monthNames.length ; i++){

          if(this.expdocs[0].expmonth == this.monthNames[i]){

            if(i== 11){
              this.newmonth=this.monthNames[0]+ " "+ (Number(this.expdocs[0].expyear)+1)
            }else{
              this.newmonth=this.monthNames[i+1]+ " "+ this.expdocs[0].expyear
            }

          }
        }

      }else{
        let date = new Date()
        var expmonth = date.getMonth()
        var expyear = date.getFullYear()
        this.newmonth=this.monthNames[expmonth]+" "+ expyear
      }

    })


  }


}
