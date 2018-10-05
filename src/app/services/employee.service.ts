import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  base_url: any="http://localhost:3000/"

  constructor(public http:HttpClient) { }


  getallEmployees(){

    return this.http.get(this.base_url+"employee")
  }

  removeEmployee(id){

    return this.http.get(this.base_url+"employee/removeEmployee?id="+id)
  }

   updateEmployee(id,name,email,phone,empid,joindate,role)
  {
    return this.http.put(this.base_url+"employee/updateEmployee?id="+id+"&name="+name+"&email="+email+"&phone="+phone+"&empid="+empid+"&joindate="+joindate+"&role="+role, {})
  }

  addEmployee(name,email,password,phone,empid,joindate,role){

    return this.http.post(this.base_url+"employee/addEmployee?name="+name+"&email="+email+"&password="+password+"&phone="+phone+"&empid="+empid+"&joindate="+joindate+"&role="+role,{})
  }

  getProjsByEmp(id){
    return this.http.get(this.base_url+"project/getProjsByEmp?iduser="+id)
  }

  getabsence(iduser){
    return this.http.get(this.base_url+"absence/getabsence?iduser="+iduser)
  }


  affectProjToEmp(iduser , idproj){

    return this.http.post(this.base_url+"project/affectProjToEmp/"+iduser+"?idproj="+idproj ,{})
  }

  getAllProjects(){
    return this.http.get(this.base_url+"project")
  }

  removeProjFromListProjByEmp(iduser , idproj){

    return this.http.get(this.base_url+"project/removeProjFromListProjByEmp?iduser="+iduser+"&idproj="+idproj)
  }

}
