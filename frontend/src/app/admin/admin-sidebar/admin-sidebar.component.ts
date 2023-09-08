import { Component,OnInit } from '@angular/core';
import { adminService } from '../admin.service';
import { Router } from '@angular/router';
import { BadgeService } from '../badge.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  pendingRequestsCount: number = 0;
  constructor(
    private adminService: adminService,
    private router: Router,
    private badgeService: BadgeService
  ) {}

  ngOnInit(): void {
    this.badgeService.badgeCount$.subscribe(
      (count) => { 
        this.pendingRequestsCount = count
      }
    )


    this.adminService.getPendingRequestsCount().subscribe(
      (response) => {
        if (response) {
          console.log(response, 'count');
          this.pendingRequestsCount = response;
          this.badgeService.updateBadgeCount(response)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  adminLogout() {
    this.adminService.removeToken();
    this.router.navigate(['/adminLogin']);
  }
}
