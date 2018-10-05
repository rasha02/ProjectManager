import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id;
  avatar;
  name;
  email;
  empid;
  phone;
  joindate;
  role;
  password;

  employees: any;

  constructor(public empServ:EmployeeService, public route :ActivatedRoute) {
    this.getAllEmployees()
  }

  ngOnInit() {
  }

  getAllEmployees(){

    this.empServ.getallEmployees().subscribe(res=>{
      console.log(res);
      this.employees=res;
    })
  }

  removeEmployee(id)
  {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.empServ.removeEmployee(id).subscribe(res=>{
          this.getAllEmployees();

        })
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  editEmployee(id, name, email, phone, empid, joindate, role){
    this.id=id;
    this.name=name;
    this.email=email;
    this.phone=phone;
    this.empid=empid;
    this.joindate=joindate;
    this.role=role;
  }

  updateEmployee(){

    this.empServ.updateEmployee(this.id,this.name, this.email, this.phone, this.empid, this.joindate, this.role).subscribe(res=>{
      this.getAllEmployees()
      swal(
        'Good job!',
        'An Employee has been edited!',
        'success'
      )

    })
  }

  addEmployee(){
    this.empServ.addEmployee(this.name, this.email, this.password, this.phone, this.empid, this.joindate, this.role).subscribe(res=>{
      console.log("done")
      this.getAllEmployees()
      swal(
        'Good job!',
        'An Employee has been added!',
        'success'
      )

    })
  }

}
