import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AgencyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let agencyToken = localStorage.getItem('agencyjwt');

     if (agencyToken) {
       const newRequest = request.clone({
         headers: request.headers.set('Authorization', 'Bearer ' + agencyToken),
       });

       return next.handle(newRequest);
     }
    return next.handle(request);
  }
}
