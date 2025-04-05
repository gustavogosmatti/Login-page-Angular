import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        console.warn(
          'Token inválido ou expirado. Redirecionando para login...'
        );
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
