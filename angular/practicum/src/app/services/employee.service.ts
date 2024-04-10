
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';
@Injectable({
  providedIn: 'root'
  
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>('https://localhost:7149/api/Employees')
  }
  getEmployeeById(id: number): Observable<Employee> {


    return this._http.get<Employee>(`https://localhost:7149/api/Employees/${id}`)
  }

  addEmployee(employee: Employee) {
    console.log(employee);

    return this._http.post('https://localhost:7149/api/Employees', employee)
  }

  deleteEmployee(id: number) {
    return this._http.delete(`https://localhost:7149/api/Employees/${id}`)
  }

  updateEmployee(id: number, employee: Employee) {
    console.log(employee);

    return this._http.put(`https://localhost:7149/api/Employees/${id}`, employee)
  }

}
