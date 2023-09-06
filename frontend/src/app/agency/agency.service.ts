import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import Swal from 'sweetalert2';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment.prod';
 const httpOptions = {
   headers: new HttpHeaders({
     withCredentials: true.toString(),
   }),
 };

@Injectable({
  providedIn: 'root',
})
export class agencyService implements CanActivate {
  baseUrl = 'http://localhost:5020';
  private tokenKey = environment.agencyTokenKey;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socket: Socket
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['agencyLayout']);

      return false;
    } else {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  getAgencyData(token): Observable<any> {
    const httpOptions2 = {
      headers: new HttpHeaders({
        withCredentials: true.toString(),
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<any>(
      `${this.baseUrl}/agency/agencyData`,
      httpOptions2
    );
  }

  updateProfileAgency(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/agency/profileUpdate`,
      formData,
      httpOptions
    );
  }

  swalFire(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  agencyRegister(agency: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/agency/registerAgency`,
      agency,
      httpOptions
    );
  }

  agencyLogin(formData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/agency/loginAgency`,
      formData,
      httpOptions
    );
  }

  emailVerify(userId: string, token: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/agency/agencyVerify/${userId}/verify/${token}`
    );
  }

  timeDataSubmit(timeData: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/agency/agencyServiceTime`, timeData);
  }

  profileImageUpload(formData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/agency/profileImageAgency`,
      formData
    );
  }

  getbookingDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/bookingDetails`);
  }

  agencyChatList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/agencyChatList`);
  }

  chatBlock(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/findchat?id=${id}`);
  }

  sendMessage(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/agency/message`, data);
  }
  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newmessage');
  }

  getDashboardCount(): Observable<any> { 
    return this.http.get(`${this.baseUrl}/agency/getDashCount`)
  }
}
