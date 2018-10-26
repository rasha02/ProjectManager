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
  nbr;

  constructor(public absServ: AbsenceService, public router: Router) {
    this.iduser=localStorage.getItem('iduser')
    this.getabsencesByEmp()

  }

  ngOnInit() {
  }

  getabsencesByEmp() {
    console.log(localStorage.getItem('iduser'))
    this.absServ.getabsencesByEmp(localStorage.getItem('iduser')).subscribe(data => {
      console.log(data)
      this.absences = data
      this.nbr=this.absences.length
    })
  }

  addLeaveRequest() {
    this.absServ.addLeaveRequest(this.absencetype, this.iduser, this.fromdate, this.todate, this.description, this.reason).subscribe(res => {
      console.log("done")
      this.getabsencesByEmp()
      swal(
        'Good job!',
        'A leave request has been added!',
        'success'
      )
    })
  }


}
