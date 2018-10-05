import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {



  clients: any;
  constructor(public clientServ:ClientService, public route :ActivatedRoute) {
    this.getClients()

  }

  ngOnInit() {
  }

  getClients(){

    this.clientServ.getClients().subscribe(res=>{
      console.log(res);
      this.clients=res;
    })
  }

}
