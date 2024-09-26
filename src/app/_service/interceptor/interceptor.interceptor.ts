import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject  } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const interceptorInterceptor: HttpInterceptorFn = (req, next) : Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('authToken');

  if (token != '') {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next);
      } else {
        return throwError(error);
      }
    })
  );
};

const handle401Error = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = localStorage.getItem('refreshToken'); // Récupérer le refresh token
    const httpBackend = new HttpClient(inject(HttpBackend));  // Utilise HttpBackend directement

    if (refreshToken) {
      return httpBackend.post('/api/refresh-token', { refresh_token: refreshToken }).pipe(
        switchMap((tokenResponse: any) => {
          isRefreshing = false;
          localStorage.setItem('authToken', tokenResponse.access_token); // Met à jour le token
          refreshTokenSubject.next(tokenResponse.access_token);

          // Rejouer la requête initiale avec le nouveau token
          return next(req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenResponse.access_token}`
            }
          }));
        }),
        catchError((err) => {
          isRefreshing = false;
          // Si le rafraîchissement échoue, déconnecter l'utilisateur
          //logout();
          return throwError(err);
        })
      );
    } else {
      // Pas de refresh token, déconnecter l'utilisateur
      //logout();
      return throwError('No refresh token available');
    }
  } else {
    // Attendre que le token soit rafraîchi et rejouer la requête
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })))
    );
  }
};
