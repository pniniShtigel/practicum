import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Employee } from '../../classes/employee';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../classes/role';
import { EmployeeRole } from '../../classes/employyRole';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    HttpClientModule, FormsModule],
  encapsulation: ViewEncapsulation.None
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: Employee = new Employee();
  EmployeeRoles: EmployeeRole[] = [];
  roles: Role[] = [];
  selectedRole: Role = new Role();
  selectedRoles: any[] = [];
  emRole: EmployeeRole = new EmployeeRole();
  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private router: Router) { }
  ngOnInit(): void {
    this.fetchRoles();
  }
  openRolePrompt(event: any): void {
    const roleId = event;
    const selectedRole2 = this.roles.find(role => role.id == roleId);
    const newRole: EmployeeRole = {
      roleId: parseInt(roleId, 10),
      managerial: false, // יכול להיות ריק לפני שהמשתמש מזין את הערך
      roleStartDate: new Date() // יכול להיות ריק לפני שהמשתמש מזין את התאריך
      ,
      id: 0,
      employeeId: 0
    };
    
    if (selectedRole2) {
   
    Swal.fire({
      title: 'Managerial Role?',
      input: 'checkbox',
      text: 'Is the role managerial',
      showCancelButton: true,
      confirmButtonText: 'Next',
      customClass: {
        input: 'swal2-checkbox-custom'
      },
      preConfirm: (managerialResponse) => {
        const managerial = JSON.parse(managerialResponse) === true;
        newRole.managerial = managerial
        return Swal.fire({
          title: 'Role Start Date?',
          input: 'date',
          inputPlaceholder: 'Enter the start date of the role (YYYY-MM-DD)',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          customClass: {
            input: 'swal2-checkbox'
          },
          preConfirm: (startDateResponse) => {
            if (startDateResponse < this.newEmployee.startDate) {
              Swal.showValidationMessage('Role start date cannot be before employee start date');
              return null
            } else {
              console.log("else");
              newRole.roleStartDate = startDateResponse;
              return { managerial, startDateResponse };
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { managerial, roleStartDate } = result.value;
            this.fetchRoles()
            this.selectedRoles.push(selectedRole2);
            console.log(newRole);
            this.EmployeeRoles.push(newRole);
            this.newEmployee.roles = this.EmployeeRoles;
            console.log(this.newEmployee);
          }
        });
      }
    });
  }
}

  addEmployee(): void {
    const ee: Employee = {
      id: this.newEmployee.id,
      firstName: this.newEmployee.firstName,
      lastName: this.newEmployee.lastName,
      email: this.newEmployee.email,
      tz: this.newEmployee.tz,
      startDate: this.newEmployee.startDate,
      birthDate: this.newEmployee.birthDate,
      gender: this.newEmployee.gender,
      roles: this.newEmployee.roles,
    }

    this.employeeService.addEmployee(ee)
      .subscribe(response => {
        Swal.fire(
          "add",
          "the employee add successfully",
          "success"

        );
        console.log(this.roles);
        this.router.navigate(['/home']);

        console.log('Employee added successfully:', response);

      }, error => {
        Swal.fire(
          "error",
          "the employee not add",
          "error"

        );
        console.error('Error occurred while adding employee:', error);
      });
  }

  isValidIdNumber(idNumber: string): boolean {
    return idNumber.length === 9;
  }
  fetchRoles(): void {
    console.log("newEmployee.roles :", this.newEmployee.roles)
    this.roleService.getRoleList()
      .pipe(
        map(roles => {
          this.roles = roles.filter(role => !this.newEmployee.roles.some(employeeRole => employeeRole.roleId === role.id));
        }),
        distinctUntilChanged()
      )
      .subscribe(() => {
        console.log("filteredRoles", this.roles);
      }, error => {
        console.error('Error occurred while fetching roles:', error);
      });
  }
  isFormValid(): boolean {
    return!!this.newEmployee.firstName &&
      !!this.newEmployee.lastName &&
      !!this.newEmployee.email &&
      !!this.newEmployee.tz &&
      !!this.newEmployee.birthDate &&
      !!this.newEmployee.startDate
  }


}