import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = '';

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
  }

  if (token != '') {
    console.log(token);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};