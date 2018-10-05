import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id;
  name;
  email;
  password;


  admins: any;

  constructor(public adminServ:AdminService) {
    this.getallAdmins()
  }

  ngOnInit() {

  }

  getallAdmins(){

    this.adminServ.getAllAdmins().subscribe(res=>{
      console.log(res);
      this.admins=res;

    })

  }

  editAdmin(id,name, email, password){
    this.id=id;
    this.name=name;
    this.email=email;
    this.password=password;

  }

  updateAdmin(){

    this.adminServ.updateAdmin(this.id,this.name,this.email,this.password).subscribe(res=>{
      this.getallAdmins()

    })

  }

  addAdmin() {
    this.adminServ.addAdmin(this.name, this.email, this.password).subscribe(res => {
      this.getallAdmins()

    })
  }

  removeAdmin(id)

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
            this.adminServ.removeAdmin(id).subscribe(res=>{
              this.getallAdmins();


            })
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            }
            })
        }

}
