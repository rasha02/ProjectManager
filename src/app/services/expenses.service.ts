import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  base_url="http://localhost:3000/"

  constructor(private http:HttpClient) { }


  getexpdocs(iduser){

    return this.http.get(this.base_url+"expenses/getexpdocs?iduser="+iduser)
  }


}
