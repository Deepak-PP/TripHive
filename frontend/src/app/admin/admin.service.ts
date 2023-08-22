import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import Swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class adminService implements CanActivate {
  baseUrl = 'http://localhost:5020';
  private tokenKey = 'adminjwt';
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['adminLayout']);

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

  adminLogin(formData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/admin/loginAdmin`,
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

  agencyData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/agency/agencyData`);
  }

  viewDetailsAgency(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/viewAgency/${id}`);
  }

  approvalRequest(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/approveAgency/${email}`);
  }

  postLocationData(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/locations`, formData, {
      withCredentials: true,
    });
  }
}