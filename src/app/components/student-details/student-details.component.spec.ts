import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap, RouterModule } from "@angular/router";
import { from, } from "rxjs";
import { AppModule } from "src/app/app.module";
import { StudentDetails } from "src/app/entity/student-details";
import { StudentService } from "src/app/services/student.service";
import { StudentDetailsComponent } from "./student-details.component";

fdescribe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture:ComponentFixture<StudentDetailsComponent>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule,RouterModule],
      declarations:[StudentDetailsComponent],
      providers:[
        {
          provide: ActivatedRoute, useValue:
              { snapshot: { paramMap: convertToParamMap( { 'id': '1' } ) } }
      }

      ]
    }).compileComponents()

    fixture = TestBed.createComponent(StudentDetailsComponent) 
    component = fixture.componentInstance
    fixture.detectChanges()

  });

  fit('should set studentDetails property with the studentDetail return from the server when the ListComponent Initialized ', () => {

    console.log('should set studentDetails property with the studentDetail return from the server when the ListComponent Initialized ')
    
    let service:StudentService=TestBed.inject(StudentService)

    spyOn(service, 'getStudentDetails').and.callFake((studentId:number) => {
      let student=new StudentDetails()
      student.id=1
      return  from([student])
    })

    component.ngOnInit()
    
    expect(component.studentDetails.id).toBe(1);
    
  });
});
