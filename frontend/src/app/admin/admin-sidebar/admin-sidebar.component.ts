import { Component } from '@angular/core';
import { adminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {
  constructor(private adminService: adminService, private router: Router) {}

  adminLogout() {
    this.adminService.removeToken();
    this.router.navigate(['/adminLogin']);
  }
}
