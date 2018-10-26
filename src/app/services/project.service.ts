import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  base_url="http://localhost:3000/"

  constructor(private http:HttpClient) { }


  getallProjects(){

    return this.http.get(this.base_url+"project")
  }

  updateProject(idproj,name,startdate,enddate)
  {
    return this.http.put(this.base_url+"project/updateProject?idproj="+idproj+"&name="+name+"&startdate="+startdate+"&enddate="+enddate, {})
  }

  removeProject(idproj){
    console.log(idproj)

    return this.http.get(this.base_url+"project/removeProject?idproj="+idproj)
  }

  listEmpsByProject(idproj){
    return this.http.get(this.base_url+"project/listEmpsByProject?idproj="+idproj)
  }


  addProject(name,theclient,startdate,enddate,priority,type,rate,msg, formData){
    console.log(name , theclient,startdate, enddate,priority,type, rate,msg, formData)
    return this.http.post(this.base_url+"project/addProject?name="+name+"&theclient="+theclient+"&startdate="+startdate+"&enddate="+enddate+"&priority="+priority+"&type="+type+"&rate="+rate+"&msg="+msg, formData)
  }

  addProjectWithoutFile(name,theclient, startdate, enddate,priority,type,rate, msg){
    return this.http.post(this.base_url+"project/addProjectWithoutFile?name="+name+"&theclient="+theclient+"&startdate="+startdate+"&enddate="+enddate+"&msg="+msg, {})
  }
getidproj(name){
  return this.http.get(this.base_url+"project/getidproj?name="+name)
}


}
