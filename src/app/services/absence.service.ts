import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AbsenceService {
  base_url: any="http://localhost:3000/"

  constructor(public http:HttpClient) { }

  addLeaveRequest(absencetype,iduser,fromdate,todate,reason,description){
    return this.http.post( this.base_url+"absence/createLeaveRequest?absencetype="+absencetype+"&iduser="+iduser+"&fromdate="+fromdate+"&todate="+todate+"&reason="+reason+"&description="+description, {})
  }

  getLeaveRequests(){

    return this.http.get(this.base_url+"absence")
  }

  getabsencesByEmp(iduser){
    return this.http.get(this.base_url+"absence/getabsencesByEmp?iduser="+iduser)

  }

  acceptLeaveRequest(id, etat){
    console.log(id)
    return this.http.put(this.base_url+"absence/acceptLeaveRequestByAdmin?id="+id+"&etat="+etat, {})
  }

  refuseLeaveRequest(id, etat){
    return this.http.put(this.base_url+"absence/refuseLeaveRequestByAdmin?id="+id+"&etat="+etat, {})
  }
}
