import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {AbsenceService} from '../../services/absence.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-emp-absences',
  templateUrl: './emp-absences.component.html',
  styleUrls: ['./emp-absences.component.css']
})
export class EmpAbsencesComponent implements OnInit {
  absencetype;
  iduser;
  fromdate;
  todate;
  description;
  reason;
  etat;
  absences;

  constructor(public absServ: AbsenceService, public router: Router) {
    this.iduser=localStorage.getItem('iduser')
    this.getabsencesByEmp(localStorage.getItem('iduser'))
  }

  ngOnInit() {
  }


  getabsencesByEmp(iduser) {
    console.log(iduser)
    this.absServ.getabsencesByEmp(iduser).subscribe(data => {
      console.log(data)
      this.absences = data
    })

  }

  addLeaveRequest() {
    this.absServ.addLeaveRequest(this.absencetype, this.iduser, this.fromdate, this.todate, this.description, this.reason).subscribe(res => {
      console.log("done")
      this.getabsencesByEmp(localStorage.getItem('iduser'))
      swal(
        'Good job!',
        'An Employee has been added!',
        'success'
      )
    })
  }


}
