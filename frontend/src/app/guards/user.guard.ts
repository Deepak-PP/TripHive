import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { userService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private userService: userService, private router: Router) {}
  canActivate() {
    const isLoggedIn = this.userService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/']);

      return false;
    } else {
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class UserGuardLet implements CanActivate {
  constructor(
    private userService: userService,
    private router: Router,
  ) {}
  canActivate() {
    const isLoggedIn = this.userService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.userService.notifySwal("Please log in to continue","info")

      return false;
    }
  }
}

