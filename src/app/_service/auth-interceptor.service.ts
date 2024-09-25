// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse,
// } from '@angular/common/http';
//import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { LoginService } from '../login/login.service';

import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = '';

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
  }
  //console.log('salut');
  if (token != '') {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  //handle401Error(request, next);
  return next(request);
  // return next(request).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         console.log('aaaa');
  //         return handle401Error(request, next);
          
  //       }
  //       return throwError(() => error);
  //     })
  //   );
};

const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // console.log('aaaa');
  const loginService = inject(LoginService);
  // console.log('bbbb');
  return loginService.refreshToken().pipe(
    switchMap((newToken: string) => {
      localStorage.setItem('token', newToken);

      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${newToken}`
        }
      });

      return next(clonedRequest);
    }),
    catchError((refreshError) => {
      console.error('Erreur de rafraîchissement du token', refreshError);
      return throwError(() => refreshError);
    })
  );
};


// export function handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   if (!this.isRefreshing) {
//     this.isRefreshing = true;
//     this.refreshTokenSubject.next(null);

//     return this.loginService.refreshToken().pipe(
//       switchMap((tokenResponse: any) => {
//         this.isRefreshing = false;
//         const newToken = tokenResponse.authToken;
//         const refreshToken = tokenResponse.refreshToken;
//         this.loginService.setToken(newToken, refreshToken);
//         this.refreshTokenSubject.next(newToken);
//         return next.handle(this.addToken(request, newToken));
//       }),
//       catchError((err) => {
//         this.isRefreshing = false;
//         return throwError(() => err);
//       })
//     );
//   } else {
//     return this.refreshTokenSubject.pipe(
//       filter((token) => token != null),
//       take(1),
//       switchMap((token) => next.handle(this.addToken(request, token!)))
//     );
//   }
// }
  
