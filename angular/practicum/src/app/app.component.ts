import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './classes/employee';
import { provideClientHydration } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,UpdateComponent,AddEmployeeComponent,HttpClientModule,],
 providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practicum';
}
