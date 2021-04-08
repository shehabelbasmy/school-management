import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IS_USER_LOGGED_IN } from '../actions';
import { IAuthorizationSate } from '../store';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isUserLoggedIn:string
  
  constructor(private router:Router,private ngRedux:NgRedux<IAuthorizationSate>){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){

    this.isUserLoggedIn=sessionStorage.getItem(IS_USER_LOGGED_IN)
    
    if(this.isUserLoggedIn=="true"){
      
      return true
    }

    this.router.navigateByUrl("/login")
    return false;
  }
}
