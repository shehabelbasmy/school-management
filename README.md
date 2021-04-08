## SchoolManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Lanuch up the server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Login 

    username: admin
    password: admin

## State Managment

*Used NgRedux library to implement the Redux to manage the state*

    store.ts   :  file which store the state of user's authentication 
    actions.ts :  file which store the actions related to state

 
# Unit $ Integration Test

Run `ng test` to execute the unit tests via [Karma]

### Write Test (6 Test Case Senario)

 >Login
 
**login.component.spec.ts**

    1. should redirect the user to the student list page ("/students") if user name and password are correct
    2. should isUserLoggedIn propertey be true if username and password are correct
 >Homepage
 
**student-list.component.spec.ts**

    3. should set students property with the studentList return from the server
    4. should Update the students lenght when we change the page size
    5. should isUserLoggedIn property be false after the user logged out

>Student Detail Page
 
 **student-details.component.spec.ts**
 
	6. should set studentDetails property with the studentDetail return from the server when the ListComponent Initialized


![Overview](https://s4.gifyu.com/images/school-management.gif)

