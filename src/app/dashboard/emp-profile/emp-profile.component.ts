import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  role;
  user;
  constructor(public empServ:EmployeeService, public route :ActivatedRoute) {
    console.log(localStorage.getItem('role'))
    this.role=localStorage.getItem('role')
    this.user=JSON.parse(localStorage.getItem('user'))[0]
  }

  ngOnInit() {
  }



}
