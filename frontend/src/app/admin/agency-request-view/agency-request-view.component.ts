import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminService } from '../admin.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { BadgeService } from '../badge.service';

@Component({
  selector: 'app-agency-request-view',
  templateUrl: './agency-request-view.component.html',
  styleUrls: ['./agency-request-view.component.css'],
})
export class AgencyRequestViewComponent implements OnInit {
  requestData: any;
  approved: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: adminService,
    private badgeService: BadgeService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data']; // Get the JSON string from the query parameters
      this.requestData = JSON.parse(jsonString);
      console.log(this.requestData);

      this.requestData.services.forEach((service: any) => {
        service.image = `${this.adminService.baseUrl}/uploads/${service.image[0]}`;
      });
    });
  }

  requestApproval(email: any) {
    console.log('here');

    this.adminService.approvalRequest(email).subscribe((response) => {
      console.log(response);
      if (response.message === 'approved') {
        this.approved = true;

        Swal.fire({
          title: '!You have approved the request of this agency',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
        this.badgeService.badgeCount$.subscribe((count) => { 
          if (count > 0) { 
            this.badgeService.updateBadgeCount(count - 1)
          }
        })
      } else if (response.message === 'denied') {
        this.approved = false;
        Swal.fire({
          title:
            '!You have denied the approval of this agency.Agency cannot provide service now',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    });
  }
}
