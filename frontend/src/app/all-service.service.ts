import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AllServiceService {
  constructor(private router: Router) {}

  handleError(status: number) {
    switch (status) {
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
}
