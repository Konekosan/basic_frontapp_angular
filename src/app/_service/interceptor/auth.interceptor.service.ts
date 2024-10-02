import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, 
          HttpRequest, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private urlBack: string = 'http://localhost:8000/login/refresh-token';
  //private logout: string = 'http://localhost:8000/login/logout';

  constructor(private httpClient: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.detail.code=='token_expired') {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }


  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = localStorage.getItem('refreshToken');
      const data = {refresh_token:refreshToken}
      const headers = {
        Accept: 'application/json',
      }
      if (refreshToken) {
        return this.httpClient.post<any>(this.urlBack, data).pipe(
          switchMap((tokenResponse: any) => {
            console.log(tokenResponse);
            this.isRefreshing = false;

            if (tokenResponse && tokenResponse.access_token) {
              localStorage.setItem('authToken', tokenResponse.access_token);
              this.refreshTokenSubject.next(tokenResponse.access_token);

              return next.handle(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokenResponse.access_token}`
                }
              }));
            } else {
              console.log('Token refresh error');
              return throwError('Token refresh failed');
            }
          }),
          catchError((err) => {
            this.isRefreshing = false;
            //this.loginService.logout();
            return throwError(err);
          })
        );
      } else {
        //this.loginService.logout();
        return throwError('Fail');
      }
    } else {
      // Si autre requête de rafraîchissement en cours
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })))
      );
    }
  }
}

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
