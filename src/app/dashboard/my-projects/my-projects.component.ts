import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {EmployeeService} from '../../services/employee.service';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  idproj;
  idclient;
  client :any;
  myprojects:any ;


  constructor(public empServ: EmployeeService, public clientserv: ClientService, public route: ActivatedRoute) {
    localStorage.getItem('iduser')
this.client=[]
    this.empServ.getProjsByEmp(localStorage.getItem('iduser')).subscribe(res => {
      this.myprojects = res
console.log(res)
console.log(res[0].theclient)
console.log(res['length'])


      for (var i = 0; i < res['length']; i++) {

        console.log(res[i].theclient)

        this.clientserv.getClientbyId(res[i].theclient).subscribe(data => {
          this.client.push(data)

        })
      }
      console.log(this.client)
    })

  }

  ngOnInit() {
  }

  getClientbyId(){
    this.clientserv.getClientbyId(this.idclient).subscribe(res =>{
      this.client=res

    })

  }




}
