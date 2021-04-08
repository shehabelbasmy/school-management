import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthorizationSate } from 'src/app/store'
import { SUCCES_LOGIN, FAILED_LOGIN,LOGOUT } from 'src/app/actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private ngRedux:NgRedux<IAuthorizationSate>) {
  }

  logIn(username:string,password:string){

    const usernameInLocalStorage=sessionStorage.getItem("username")
    const passwordInLocalStorage=sessionStorage.getItem("password")

    if(username===usernameInLocalStorage&&password===passwordInLocalStorage){
      
      this.ngRedux.dispatch({type:SUCCES_LOGIN})
      this.router.navigateByUrl("/students")

    }else{
      this.ngRedux.dispatch({type:FAILED_LOGIN})
    }
  }

  logout(){

    this.ngRedux.dispatch({type:LOGOUT})
    this.router.navigateByUrl("/login")

  }

}

