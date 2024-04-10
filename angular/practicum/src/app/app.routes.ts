import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'update-employee', component: UpdateComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
