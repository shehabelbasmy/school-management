import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { IS_USER_LOGGED_IN } from 'src/app/actions';
import { AppModule } from 'src/app/app.module';
import { Student } from 'src/app/entity/student';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseForAllStudents, StudentService } from 'src/app/services/student.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';

import { StudentListComponent } from './student-list.component';

fdescribe('StudentListComponent', () => {
  let fixture: ComponentFixture<StudentListComponent>
  let component: StudentListComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
      ],
      declarations: [StudentDetailsComponent],
      providers: [AuthService, StudentService]
    }).compileComponents()
  }))
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  fit('should set students property with the studentList return from the server', () => {
    
    console.log('should set students property with the studentList return from the server')

    let service = TestBed.inject(StudentService)
    
    spyOn(service, 'getAllStudents').and.callFake((pageNumber: number, pageSize: number) => {
      let student = new Student()
      let responseForAllStudents: ResponseForAllStudents = {
        page: 1,
        per_page: 3,
        total: 4,
        total_pages: 3,
        data: [student]
      }
      return from([responseForAllStudents])
    })
    component.ngOnInit()

    expect(component.students.length).toBe(1);
  });

  //loggout test
  fit("should isUserLoggedIn propertey be false after the user looged out", () => {

    console.log('should isUserLoggedIn propertey be false after the user looged out')

    component.logout()

    expect(sessionStorage.getItem(IS_USER_LOGGED_IN)).toBe("")
  })

  //homepage
  fit('should Update the students lenght when we change the page size', () => {
    
    console.log('should Update the students lenght when we change the page size')

    let service = TestBed.inject(StudentService)
    spyOn(service, 'getAllStudents').and.callFake((pageNumber: number, pageSize: number) => {
      let student = new Student()
      let responseForAllStudents: ResponseForAllStudents = {
        page: 1,
        per_page: 1,
        total: 12,
        total_pages: 12,
        data: [student]
      }
      return from([responseForAllStudents])
    })

    component.updatePageSize(1)

    expect(component.students.length).toBe(1)

  })
});
