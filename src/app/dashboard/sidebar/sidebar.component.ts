import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
role;
user;
  constructor(public router : Router) {

    console.log(localStorage.getItem('role'))
    this.role=localStorage.getItem('role')
    this.user=JSON.parse(localStorage.getItem('user'))[0]
  }

  ngOnInit() {
  }


  logout(){

    localStorage.removeItem('state')
    localStorage.removeItem('role')
    this.router.navigate([''])
  }

  getUserName(){

    if (this.role == 'admin')
    {}
  }

}
