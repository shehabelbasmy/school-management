import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDetails } from 'src/app/entity/student-details';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentDetails:StudentDetails=new StudentDetails()
  
  constructor(private studentsService:StudentService,private router:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    
    this.getStudentDetails()
  }

  getStudentDetails(){
    const studentsId=+this.router.snapshot.paramMap.get("id")
    
    this.studentsService.getStudentDetails(studentsId).subscribe(
      data=>{
        this.studentDetails=data
      }
    )
  }
}
