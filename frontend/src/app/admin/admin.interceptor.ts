import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
            let adminToken = localStorage.getItem('adminjwt');

            if (adminToken) {
              const newRequest = request.clone({
                headers: request.headers.set(
                  'Authorization',
                  'Bearer ' + adminToken
                ),
              });

              return next.handle(newRequest);
            }
    return next.handle(request);
  }
}
