import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AuthGuard } from './guards/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { AuthService } from './services/auth.service';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAuthorizationSate, INITAL_AUTHORIZATION_SATE, rootReducer } from './store';
import { IS_USER_LOGGED_IN } from './actions';

const routes:Routes=[
  {path: 'login',component:LoginComponent},
  {path: 'students',component:StudentListComponent,canActivate:[AuthGuard]},
  {path: 'students/:id',component:StudentDetailsComponent,canActivate:[AuthGuard]},
  {path: '',redirectTo:'studnets',pathMatch:'full'},
  {path: '**',redirectTo: 'students',pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentListComponent,
    StudentDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgReduxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule{

  constructor(private ngRedux:NgRedux<IAuthorizationSate>){
    ngRedux.configureStore(rootReducer,INITAL_AUTHORIZATION_SATE)
    if(IS_USER_LOGGED_IN){
      sessionStorage.setItem(IS_USER_LOGGED_IN,"")
    }
    this.createUsernameAndPasswordInSessionStorage()
  }

  createUsernameAndPasswordInSessionStorage(){
    sessionStorage.setItem("username","admin")
    sessionStorage.setItem("password","admin")
  }
  
}

