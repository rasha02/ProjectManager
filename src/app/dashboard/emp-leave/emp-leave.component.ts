import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbsenceService} from '../../services/absence.service';
import swal from "sweetalert2";
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.css']
})
export class EmpLeaveComponent implements OnInit {

  id;
  absEmp: any
  leaveReqs: any;
  etat;
  constructor(public absServ:AbsenceService, public empServ:EmployeeService, public route :ActivatedRoute) {

    this.getLeaveRequests()

  }


  ngOnInit() {
  }

   getLeaveRequests(){

    this.absEmp=[]
     this.absServ.getLeaveRequests().subscribe(res=>{
        console.log(res)
        this.leaveReqs=res;
       console.log(res)
       console.log(res[0].iduser)
       console.log(res['length'])

        for(var i=0; i< res['length'];i++){
          console.log(res[i].iduser)
          this.empServ.getEmpById(res[i].iduser).subscribe(data =>{
            this.absEmp.push(data)
          })
        }
       console.log(this.absEmp)
      })
  }

  editLeaveReq(id) {
    this.id = id;
    console.log(this.id)

  }


  acceptLeaveRequest(){
    this.absServ.acceptLeaveRequest(this.id, "Request accepted").subscribe(res=>{
      console.log("ALLLLL",this.id)
      this.getLeaveRequests()
      swal(
        'Good job!',
        'A leave request has been accepted !',
        'success'
      )

    })
    this.etat="Request accepted"
  }

  refuseLeaveRequest(){
    console.log("REFFFFF",this.id)
    this.absServ.refuseLeaveRequest(this.id, "Request refused").subscribe(res=>{
      this.getLeaveRequests()
      swal(
        'Good job!',
        'A leave request has been refused !',
        'success'
      )

    })
    this.etat="Request refused"
  }

}
