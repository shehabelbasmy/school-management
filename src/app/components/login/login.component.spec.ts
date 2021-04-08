import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IS_USER_LOGGED_IN } from 'src/app/actions';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

class RouterStub {
  navigateByUrl(url: string) {

  }
}


fdescribe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let username: string
  let password: string

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppModule,
        ReactiveFormsModule,
        NgReduxModule,
        RouterModule,
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        AuthService,
        {provide:Router,useClass:RouterStub}
      ],

    })

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sessionStorage.setItem(IS_USER_LOGGED_IN, "")
    sessionStorage.setItem("username", "admin")
    sessionStorage.setItem("password", "admin")

    component.loginFormGroup.get('username').setValue('admin')
    component.loginFormGroup.get('password').setValue('admin')

    username = component.loginFormGroup.get("username").value
    password = component.loginFormGroup.get("password").value

  });

  fit('should redirect the user to the student list page ("/students") if user name and password are correct', () => {

    console.log('should redirect the user to the student list page ("/students") if user name and password are correct')

    let router = TestBed.inject(Router)

    let spy = spyOn(router,'navigateByUrl')
    component.logIn()

    expect(spy).toHaveBeenCalledOnceWith("/students")

    // expect(comp).toBeTruthy();
  });

  fit('should isUserLoggedIn propertey be true if username and password are correct', () => {
    
    console.log('should isUserLoggedIn propertey be true if username and password are correct')

    component.logIn()

    expect(sessionStorage.getItem(IS_USER_LOGGED_IN)).toBe("true")
  })

});
