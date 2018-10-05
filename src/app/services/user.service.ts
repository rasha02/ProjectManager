import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url: any="http://localhost:3000/"

  constructor(public http:HttpClient) { }


  getallUsers(){

    return this.http.get(this.base_url+"users")
  }

  removeUser(id){

    return this.http.get(this.base_url+"users/removeUser?id="+id)

  }
  getNameUser(iduser){
    return this.http.get(this.base_url+"users/getNameUser?iduser="+iduser)
  }

  updateUser(id,name,email,password)
  {
    return this.http.put(this.base_url+"users/updateUser?id="+id+"&name="+name+"&email="+email+"&password="+password, {})
  }

  addUser(name,email,password){

    return this.http.post(this.base_url+"users/addUser?name="+name+"&email="+email+"&password="+password,{})
  }

  getProjsByUser(id){
    return this.http.get(this.base_url+"projects/getProjsByUser?idUser="+id)
  }

  affectNewProjToUser(iduser , idproj){

    return this.http.post(this.base_url+"projects/affectNewProjToUser/"+iduser+"?idproj="+idproj , {})
  }

  getAllProjects(){
    return this.http.get(this.base_url+"projects")
  }

  removeProjFromListProjByUser(iduser , idproj){

    return this.http.get(this.base_url+"projects/removeProjFromListProjByUser?iduser="+iduser+"&idproj="+idproj)
  }



}
