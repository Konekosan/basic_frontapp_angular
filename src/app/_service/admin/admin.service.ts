import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl : string = 'http://localhost:8000/admin/';
  rolesUrl : string = this.baseUrl + 'roles';

  constructor(private http: HttpClient) { }

  fetchAllRoles(): Observable<any> {
    return this.http.get<any>(this.rolesUrl);
  }

}
