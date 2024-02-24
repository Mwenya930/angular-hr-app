import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;

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
}
