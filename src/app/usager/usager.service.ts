import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  baseUrl : string = 'http://localhost:8000/';
  usagersUrl : string = this.baseUrl + 'usager/';
  createUsager : string = this.usagersUrl + 'create';
  header_node = {
    Accept: 'application/json',
  }

  constructor(private http: HttpClient) { }

  fetchAllUsager() {
    return this.http.get(this.usagersUrl)
  }

}
