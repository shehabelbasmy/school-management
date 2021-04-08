import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../entity/student';
import { StudentDetails } from '../entity/student-details';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl:string='https://reqres.in/api/users'
  constructor(private httpClient:HttpClient) { }
  
  getAllStudents(pageNumber:number,pageSize:number):Observable<ResponseForAllStudents>{
    
    return this.httpClient.
                  get<ResponseForAllStudents>(`${this.baseUrl}?page=${pageNumber}&per_page=${pageSize}`)
  }

  getStudentDetails(studentId:number):Observable<StudentDetails>{

    return this.httpClient.get<ResponseForOneStudent>(`${this.baseUrl}/${studentId}`).pipe(
      map(response=>response.data)
    )
  }
  
}
export interface ResponseForOneStudent{
  data:StudentDetails
}

export interface ResponseForAllStudents {
  page:number
  per_page:number
  total:number
  total_pages:number
  data:Student[]
}