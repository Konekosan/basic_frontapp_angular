import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/';
  private urlLogin = this.apiUrl + 'login';
  private urlMe = this.urlLogin + '/me';
  private refreshTokenUrl = this.urlLogin + '/refresh-token' 
  token: string | null = null;
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept': 'application/json'
  });

  usagerInfo: any;
  private userInfoSource = new BehaviorSubject<any>(null);
  currentUserInfo = this.userInfoSource.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('authToken');
      if (this.token) {
        this.getCurrentUser(this.token).subscribe(
          reponse => {
            //console.log(reponse);
          }
        );
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
        this.setToken(response.access_token, response.refresh_token);
      }),
      switchMap(response =>
        this.getCurrentUser(response.access_token).pipe(
          tap(currentUser => {
            this.userInfoSource.next(currentUser);
            this.loggedInSubject.next(true);
          }),
          map(currentUser => ({ token: response.access_token, user: currentUser }))
        )
      )
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.httpClient.post<any>(this.refreshTokenUrl, { refreshToken });
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

  setToken(access_token: string, refresh_token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
      this.loggedInSubject.next(false);
    }
  }

}
