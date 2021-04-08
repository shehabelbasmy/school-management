import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;

  constructor(private authService:AuthService,private formBuilder:FormBuilder){ }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    
  }


  logIn(){
    const username:string=this.loginFormGroup.get('username').value
    const password:string=this.loginFormGroup.get('password').value
    this.authService.logIn(username,password)
  }

}
