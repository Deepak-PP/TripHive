import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminService } from '../admin.service';

@Component({
  selector: 'app-admin-view-agencies',
  templateUrl: './admin-view-agencies.component.html',
  styleUrls: ['./admin-view-agencies.component.css'],
})
export class AdminViewAgenciesComponent {
  agencyData: any[]
  constructor(
    private http: HttpClient,
    private router: Router,
    private adminService: adminService
  ) {}
  ngOnInit(): void {
    this.fetchAgencyData();
  }

  fetchAgencyData() {
    this.adminService.agencyDataAll().subscribe((response) => {
      const data = response
      console.log(data,"agencydatahere");

      this.agencyData = data.filter((item: any) => item.adminApproved === true);
      console.log(this.agencyData, 'agencydatahereveriofied');

    });
  }

  viewDetails(id: number) {
    return this.adminService
      .viewDetailsAgency(id)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .subscribe(
        (response) => {
          console.log('Response:', response);
          // Do something with the response here
          const jsonString = JSON.stringify(response);
          this.router.navigate(['/adminLayout/agencyRequestView', id], {
            queryParams: { data: jsonString },
          });
        },
        (error) => {
          console.error('Error:', error);
          // Handle errors if any
        }
      );
  }
}
