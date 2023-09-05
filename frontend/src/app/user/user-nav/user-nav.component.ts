import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
})
export class UserNavComponent implements OnInit {
  userName: string | undefined;
  isLoggedIn: Boolean;
  authenticated: Boolean = false;
  showProfileDropdown: boolean = false;
  menubardown: boolean = false;

  constructor(private userAuthService: userService, private http: HttpClient,private router:Router) {
    this.isLoggedIn = this.userAuthService.isAuthenticated();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const token = this.userAuthService.getToken();
      if (token) {
        this.userAuthService.getUserData(token).subscribe(
          (response: any) => {
            this.userName = response.name;
            this.authenticated = true;
            console.log(this.userName);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  toggleProfileDropdown() {
    console.log('clicked');

    this.showProfileDropdown = !this.showProfileDropdown;
  }
  menumobile() {
    this.menubardown = !this.menubardown;
  }

  logout() {
    this.userAuthService.removeToken();
    this.authenticated = false;
    this.showProfileDropdown = !this.showProfileDropdown;
    this.router.navigate(['/'])
  }
}
