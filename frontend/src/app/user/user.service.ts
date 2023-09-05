import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import {  Router } from "@angular/router";
import {
  Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { initializeApp, FirebaseApp } from 'firebase/app';

import Swal from 'sweetalert2';
import { environment } from "src/environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class userService {
  baseUrl = 'http://localhost:5020';
  private tokenKey = 'userjwt';

  constructor(private http: HttpClient, private router: Router) {}

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

  userRegister(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, httpOptions);
  }

  userLogin(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, formData, httpOptions);
  }

  swalFire(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  getUserData(token: any): Observable<any> {
    const httpOptionsGet = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(`${this.baseUrl}/user`, {}, httpOptionsGet);
  }

  emailVerifyUser(userId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/verify/${token}`);
  }

  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return this.AuthLogin(provider).then((res: any) => {
      return res.accessToken;
    });
  }

  AuthLogin(provider: any) {
    const app = initializeApp(environment.firebase);

    const auth = getAuth(app);
    auth.languageCode = 'it';

    return signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        return result.user;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  googleSignIn(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loginGoogle`, data, {
      withCredentials: true,
    });
  }

  getLocationData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations`);
  }

  viewLocationDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locationDetails/${id}`);
  }

  getAgencyData(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAgencyData/${id}`);
  }

  bookingSubmit(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submitBooking`, data, {
      withCredentials: true,
    });
  }

  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyPayment`, data, {
      withCredentials: true,
    });
  }

  getBookingData(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookingData/${id}`);
  }

  getUserBookingData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBookingDetails`);
  }

  userchatlist(id:string) {
    return this.http.get(`${this.baseUrl}/userchat?id=${id}`, httpOptions);
  }

  chatBlock(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allmessages?id=${id}`, httpOptions);
  }

  sentMessage(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/message`, data, {
      withCredentials: true,
    });
  }

  chatConnection(id: string): Observable<any> { 
    return this.http.post(
      `${this.baseUrl}/makeConnection?id=${id}`,
      httpOptions
    );
  }

  notifySwal(message,title) { 
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: title,
        title: message,
      });

  }

}