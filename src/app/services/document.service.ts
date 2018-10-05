import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

 base_url="http://localhost:3000/"

  constructor(private http:HttpClient) { }



  getDocsByProject(idproj){
    return this.http.get(this.base_url+"document/getDocsByProject?idproj="+idproj)
  }

  getDocsByEmpByProj(iduser , idproj){
    return this.http.get(this.base_url+"document/getDocsByUserByProj?iduser="+iduser+"&idproj="+idproj)
  }

  saveDoc(iduser , iddoc ,comment , activity){
console.log(activity)
   return this.http.post(this.base_url+"document/saveDoc?iduser="+iduser+"&iddoc="+iddoc+"&comment="+comment+"&activities="+JSON.stringify(activity) , {})

}

createdoc(iduser){
   return this.http.get(this.base_url+"document/createDoc?iduser="+iduser)
}

getperiode(iduser){

   return this.http.get(this.base_url+"document/getperiode?iduser="+iduser)
}

getdocbyperiode(iduser , iddoc , name){

   return this.http.get(this.base_url+"document/getdocbyperiode?iduser="+iduser+"&iddoc="+iddoc+"&name="+name)
}

}
