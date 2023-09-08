import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            console.log("reached error herere");
            
            switch (error.status) {
              case 400:
                this.router.navigate(['/400']);
                break;
              case 404:
                this.router.navigate(['/404']);
                break;
              case 500:
                this.router.navigate(['/500']);
                break;
              case 502:
                this.router.navigate(['/502']);
                break;
              case 401:
                this.router.navigate(['/']);
                break;
              default:
                this.router.navigate(['/error']);
            }
          }
        } else {
          console.log('An error occurred');
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
