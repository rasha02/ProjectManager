import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  base_url: any="http://localhost:3000/"

  constructor(public http:HttpClient) { }


  getClients(){
  return this.http.get(this.base_url+"client")
}


  addClient(fn,ln,email,company,phone,clientid,address){
    return this.http.post(this.base_url+"client/addClient?firstname="+fn+"&lastname="+ln+"&email="+email+"&company="+company+"&phone="+phone+"&clientid="+clientid+"&address="+address,{})
  }


  getClientbyId(theclient){

    console.log(theclient)
    return this.http.get(this.base_url+"client/getClientbyProj?idclient="+theclient)
  }
}
