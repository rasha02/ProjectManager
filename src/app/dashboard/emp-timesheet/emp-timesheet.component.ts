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
  constructor(public docserv : DocumentService , public router:Router) {
    localStorage.getItem('iduser')

    this.getperiode(localStorage.getItem('iduser'))
  }

  ngOnInit() {
  }


  getperiode(iduser){
      console.log(iduser)
    this.docserv.getperiode(iduser).subscribe( data => {
           console.log(data)
      this.periodes=data
    })


  }





}
