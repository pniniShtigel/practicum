import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../classes/employee';
import { Role } from '../../classes/role';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { EmployeeRole } from '../../classes/employyRole';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet],
  providers: [
    EmployeeService 
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  @Input() employeeId: number = 1;
  editedEmployee: Employee = new Employee();
  EmployeeRoles: EmployeeRole[] = [];
  newEmployeeRoles: EmployeeRole[] = [];
  roles: Role[] = []
  selectedRole: Role = new Role();
  // selectedRoles: any[] = [];
  emRole: EmployeeRole = new EmployeeRole();

  constructor(private _http: HttpClient,
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe(employee => {
        this.editedEmployee = employee;
        console.log(this.editedEmployee);
        this.fetchRoles()
      });
  }
  deleteRole($event: MouseEvent, roleId: number) {
    const index = this.editedEmployee.roles.findIndex(role => role.roleId === roleId);
    if (index !== -1) {
      this.EmployeeRoles.splice(index, 1);
      console.log("delete");
    }
  }

  isValidIdNumber(idNumber: string): boolean {
    return idNumber.length === 9;
  }
  
  // saveChanges(): void {
  //   console.log(this.editedEmployee);
  //   this.employeeService.updateEmployee(this.editedEmployee.id, this.editedEmployee)
  //     .subscribe(() => {
  //       console.log('Changes saved successfully.');
  //       Swal.fire(
  //         'update!',
  //         'update successfully',
  //         'success'

  //       );
  //       this.router.navigate(['/home']);
  //     }, error => {
  //       console.error('Error occurred while saving changes:', error);
  //       Swal.fire(
  //         "Failed ",
  //         "Failed to update",
  //         'error'
  //       );
  //     });
  // }
  saveChanges(): void {
    this.checkAndRemoveDuplicateRoles();
    console.log(this.editedEmployee);
    this.employeeService.updateEmployee(this.editedEmployee.id, this.editedEmployee)
      .subscribe(() => {
        console.log('Changes saved successfully.');
        Swal.fire(
          'update!',
          'update successfully',
          'success'
        );
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error occurred while saving changes:', error);
        Swal.fire(
          "Failed ",
          "Failed to update",
          'error'
        );
      });
  
    // עריכת האיברים במערך במקום להעתיק אותו
    for (let i = 0; i < this.editedEmployee.roles.length; i++) {
      this.editedEmployee.roles[i] = { ...this.editedEmployee.roles[i] };
    }
  }
  
  getRoleName(id:number) {
    this.roleService.getRoleById(id).subscribe(
      (data: string) => {
       return data
      },
      (error: any) => {
        console.error('Error fetching role:', error);
      }
    );
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
   
              if (startDateResponse < this.editedEmployee.startDate) {
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
              // this.selectedRoles.push(selectedRole2);
              // console.log(newRole);
              this.editedEmployee.roles.push(newRole);
              console.log(this.editedEmployee);
            }
          });
        }
      });
    }
  }
  
 
  fetchRoles(): void {
    console.log("editedEmployee.roles :",this.editedEmployee.roles)
    this.roleService.getRoleList()
      .pipe(
        tap(roles => {
          this.roles = roles.filter(role => !this.editedEmployee.roles.some(employeeRole => employeeRole.roleId === role.id));
        }),
        distinctUntilChanged()
      )
      .subscribe(() => {
        console.log("filteredRoles", this.roles);
      }, error => {
        console.error('Error occurred while fetching roles:', error);
      });
}

checkAndRemoveDuplicateRoles(): void {
  const uniqueRoles: EmployeeRole[] = [];

  // עבור כל תפקיד ברשימת התפקידים של העובד
  for (const role of this.editedEmployee.roles) {
      // בדוק אם התפקיד כבר קיים ברשימת התפקידים הייחודים
      const existingIndex = uniqueRoles.findIndex(r => r.roleId === role.roleId);

      // אם התפקיד קיים כבר, החלף אותו בתפקיד החדש
      if (existingIndex !== -1) {
          uniqueRoles[existingIndex] = role;
      } else {
          // אחרת, הוסף את התפקיד לרשימת התפקידים הייחודים
          uniqueRoles.push(role);
      }
  }

  // החלף את רשימת התפקידים של העובד ברשימת התפקידים הייחודים
  this.editedEmployee.roles = uniqueRoles;
}

}

