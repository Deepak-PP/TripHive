import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let userToken = localStorage.getItem('userjwt');

        if (userToken) {
          const newRequest = request.clone({
            headers: request.headers.set(
              'Authorization',
              'Bearer ' + userToken
            ),
          });

          return next.handle(newRequest);
        }
    return next.handle(request);
  }
}
