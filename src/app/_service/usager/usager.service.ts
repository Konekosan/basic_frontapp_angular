import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddUsagerForm, Usager } from '../../_model/usager.model';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  baseUrl : string = 'http://localhost:8000/';
  usagersUrl : string = this.baseUrl + 'usager/';
  createUsager : string = this.usagersUrl + 'create';
  subscribeUsager: string = this.usagersUrl + 'subscribe';
  header_node = {
    Accept: 'application/json',
  }

  usager: Usager;

  constructor(private http: HttpClient) { }

  setUserData(usager: Usager) {
    this.usager = usager;
  }

  getUserData() {
    return this.usager;
  }

  subscribeUSager(data: any): Observable<Usager[]> {
    return this.http.post<Usager[]>(this.subscribeUsager, data, { headers: this.header_node })
  }

  fetchAllUsager(): Observable<Usager[]> {
    return this.http.get<Usager[]>(this.usagersUrl)
  }

  addUsager(data: AddUsagerForm): Observable<Usager[]> {
    return this.http.post<Usager[]>(this.createUsager, data, { headers: this.header_node });
  }

  fetchUsagerById(id: string): Observable<Usager[]> {
    return this.http.get<Usager[]>(this.usagersUrl + id);
  }

  deleteUsagerById(id: string): Observable<string> {
    return this.http.delete<string>(this.usagersUrl + id);
  }

}
