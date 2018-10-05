import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbsenceService} from '../../services/absence.service';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.css']
})
export class EmpLeaveComponent implements OnInit {


  leaveReqs: any;
  constructor(public absServ:AbsenceService, public route :ActivatedRoute) {

    this.getLeaveRequests()
  }


  ngOnInit() {
  }




  getLeaveRequests(){

    this.absServ.getLeaveRequests().subscribe(res=>{
      console.log(res);
      this.leaveReqs=res;
    })
  }

}
