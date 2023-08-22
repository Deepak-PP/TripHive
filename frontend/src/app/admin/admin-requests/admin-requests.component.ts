import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { adminService } from '../admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  agencyData:any[] = []
  constructor(private http:HttpClient,private router:Router,private adminService:adminService) { }
  ngOnInit(): void {
    this.fetchAgencyData()
  }

  fetchAgencyData() {
    this.adminService.agencyData().subscribe((response) => {
      const data = [response];
      console.log(data);

      this.agencyData = data.filter(
        (item: any) => item.adminApproved === false
      );
    });
  }

   viewDetails(id: number) {
    return this.adminService.viewDetailsAgency(id)
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
          this.router.navigate(['/adminLayout/agencyRequestView', id], { queryParams: { data: jsonString } });
        },
        (error) => {
          console.error('Error:', error);
          // Handle errors if any
        }
      )
  }
  
}
