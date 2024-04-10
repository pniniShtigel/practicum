import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '../classes/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }
  getRoleList(): Observable<Role[]> {
    return this._http.get<Role[]>('https://localhost:7149/api/Role')
  }
  getRoleById(id: number) {
    return this._http.get<string>(`https://localhost:7149/api/Role/${id}`)
  }
}
