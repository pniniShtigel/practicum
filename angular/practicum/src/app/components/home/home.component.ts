import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from '../update/update.component';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { Employee } from '../../classes/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule,
    UpdateComponent, RouterOutlet, RouterModule, MatIconModule, FlexLayoutModule,],
  providers: [EmployeeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  searchTermSubject = new Subject<string>();
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = "";
  constructor(private employeeService: EmployeeService, private router: Router) { }


  ngOnInit(): void {
    this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.filterEmployees();
    });
    this.getEmployees();
    console.log("the employees", this.filteredEmployees)
  }

 
  getEmployees() {
    this.employeeService.getEmployeeList().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.filterEmployees(); // קריאה לפונקציה filterEmployees() לאחר שקיבלת את רשימת העובדים
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  
  printEmployee() {
    window.print();
  }
  onSearchTermChange() {
    this.searchTermSubject.next(this.searchTerm);
  }
  

  toggleAddEmployeeComponent() {
    this.router.navigate(['/add-employee']);
  }


  deleteEmployee(event: any, em: Employee): void {
    Swal.fire({
      title: 'are you shure?',
      text: 'you will not able to recomment this employee!',
      icon: 'warning',
      showCancelButton: true,

      confirmButtonColor: '#ff1b1b',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'yes,delete it!',
      cancelButtonText: 'no, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(em.id).subscribe(
          () => {
            Swal.fire(
              'deleted!',
              'the employee deleted succesfully',
              'success'

            );
            this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== em.id);
            this.router.navigate(['/home']); 
          },
          (error: any) => {
            console.error('Error deleting employee:', error);
            Swal.fire(
              'error!',
              'failed to delete employee',
              'error'
            );
          }
        );
      }
    });
  }

  filterEmployees() {
    console.log('Search term:', this.searchTerm);
    this.filteredEmployees = this.employees.filter(employee => {
      return employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || employee.tz.includes(this.searchTerm);
    });
  }

  
  sendEmail(event: any,employee: Employee) {
    window.location.href = `mailto:${employee.email}?subject=${encodeURIComponent(`hi ${employee.firstName}`)}`;
  }
  exportToExcel(): void {
    this.employeeService.getEmployeeList().subscribe(data => {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      XLSX.writeFile(workbook, 'employees.xlsx');
    });
  }
  editEmployee(event: any, employeeId: Number) {
    this.router.navigate(['/update-employee', { id: employeeId }]);

  }
  onTextHover($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    target.classList.add('table-row');
  }

  onTextLeave($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    target.classList.remove('table-row');
  }
  onHover($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    target.classList.add('table-row-hover');
  }

  onLeave($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    target.classList.remove('table-row-hover');
  }
}