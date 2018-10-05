import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router:Router)  {
      }


      canActivate()
{

    if(localStorage.getItem("state")==="1")
      return true;
    else
    {
      this.router.navigate([""])
      return false;

    }

}

}
