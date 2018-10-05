import { Component } from '@angular/core';
import {UserService} from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iManager';
/*
  users: any = [{
    id: 1,
    firstName: 'Rasha',
    lastName: 'Hamdi'
  },
    {
      id: 2,
      firstName: 'Med',
      lastName: 'Hamdi'
    },
    {
      id: 3,
      firstName: 'Josef',
      lastName: 'Hamdi'
    }]
*/

  users: any ;

  constructor(public userServ:UserService){

      this.userServ.getallUsers().subscribe (res=> {

      this.users=res;

  })

}
}
