import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  username;
  constructor(public router:Router , public adminServ :AdminService) {

    /*if(localStorage.getItem('state') == "1"){
      this.router.navigate(["dashboard"])
    }*/

  }

  ngOnInit() {
  }

  login() {

    console.log("click");
    console.log("email: " + this.email);
    console.log("password: " + this.password);

    this.adminServ.login(this.email, this.password).subscribe(data => {
     console.log(data)
      if (data['auth'] == true) {
        console.log(data)
        localStorage.setItem("state", "1");
        localStorage.setItem("iduser", data['user'][0]['_id']);
        localStorage.setItem("user", JSON.stringify(data['user']));
       // localStorage.setItem("admin", JSON.stringify(data['admin']));
        localStorage.setItem('role' , data['role'])
        this.router.navigate(["dashboard"])
      } else {
        alert("email or password wrong")
      }


    })

  }


}
