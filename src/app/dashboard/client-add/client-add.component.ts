import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../services/client.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  firstname;
  lastname;
  company;
  email;
  phone;
  clientid;
  address;

  clients: any;
  constructor(public clientServ:ClientService, public route :ActivatedRoute) { }

  ngOnInit() {
  }


  addClient(){
    this.clientServ.addClient(this.firstname,this.lastname,this.email, this.company, this.phone, this.clientid, this.address).subscribe(res=>{
      console.log("done")

      swal(
        'Good job!',
        'A client has been added!',
        'success'
      )

    })
  }


}
