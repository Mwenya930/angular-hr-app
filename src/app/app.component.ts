import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        // Success callback
        this.employees = response;
      },

      error: (error: HttpErrorResponse) => {
        // Error callback
        alert(error.message);
      },

      complete: () => {
        // Complete callback
        // Note: You can handle completion if needed.
      },
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    ('');
    // close modal when save changes button is clicked
    document.getElementById('add-employee-form')?.click();

    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        // Error callback
        alert(error.message);
      },
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    ('');
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        // Error callback
        alert(error.message);
      },
    });
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    ('');
    if (employeeId !== undefined) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        error: (error: HttpErrorResponse) => {
          // Error callback
          alert(error.message);
        },
      });
    }
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];

    for (const employee of this.employees!) {
      if (
        employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==
          -1 ||
        employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==
          -1 ||
        employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==
          -1 ||
        employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==
          -1 ||
        employee.jobTitle
          .toLocaleLowerCase()
          .indexOf(key.toLocaleLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }

    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(
    event: any,
    employee: Employee | null,
    mode: string
  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      this.editEmployee = employee!;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      this.deleteEmployee = employee!;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
