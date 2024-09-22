import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

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

  constructor(private httpClient: HttpClient,
              private router: Router) {

    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('authToken');
      console.log(this.token);
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
      this.getCurrentUser(response.access_token).subscribe(currentUser => {
        console.log(currentUser);
        this.userInfoSource.next(currentUser);
      });
      this.userInfoSource.next(response);
    }));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
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
    localStorage.setItem('authToken', token);
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

}
