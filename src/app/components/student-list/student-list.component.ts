import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/entity/student';
import { AuthService } from 'src/app/services/auth.service';

import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  pageNumber: number = 1;
  pageSize: number = 6;
  totalStudents: number
  number1: number = 0
  constructor(private authService: AuthService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  logout() {
    this.authService.logout()
  }

  getAllStudents() {

    this.studentService.getAllStudents(this.pageNumber, this.pageSize).subscribe(
      data => {
        this.students = data.data
        this.pageNumber = data.page
        this.pageSize = data.per_page
        this.totalStudents = data.total
      }
    )
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize
    this.pageNumber = 1

    this.getAllStudents()
  }

}
