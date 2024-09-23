import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/';
  private urlLogin = this.apiUrl + 'login';
  private urlMe = this.urlLogin + '/me';
  token: string | null = null;
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept': 'application/json'
  });

  usagerInfo: any;
  private userInfoSource = new BehaviorSubject<any>(null);
  currentUserInfo = this.userInfoSource.asObservable();

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('authToken');
      if (this.token) {
        this.getCurrentUser(this.token).subscribe();
      }
    }
  }

  login(username: string, password: string){

    const dataLogin = new URLSearchParams();
    dataLogin.set('grant_type','password');
    dataLogin.set('username', username);
    dataLogin.set('password', password);
    dataLogin.set('scope','');
    dataLogin.set('client_id','');
    dataLogin.set('client_secret','');

    return this.httpClient.post<any>(this.urlLogin, dataLogin.toString(), { headers: this.headers })
    .pipe(tap(response => {
        this.setToken(response.access_token);
      }),
      switchMap(response =>
        this.getCurrentUser(response.access_token).pipe(
          tap(currentUser => {
            this.userInfoSource.next(currentUser);
          }),
          map(currentUser => ({ token: response.access_token, user: currentUser }))
        )
      )
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  getCurrentUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.urlMe, { headers }).pipe(
      tap(currentUsager => this.userInfoSource.next(currentUsager))
    );
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
  }

}
