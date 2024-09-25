import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) : Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('authToken');

  if (token != '') {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
