import { Component, OnInit } from '@angular/core';
import { agencyService } from '../agency.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-agency-bookings',
  templateUrl: './agency-bookings.component.html',
  styleUrls: ['./agency-bookings.component.css'],
})
export class AgencyBookingsComponent implements OnInit {
  agencyToken: string = '';
  bookingData: any;

  constructor(
    private agencyService: agencyService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBookingDetails();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // Customize the format as you need
  }

  fetchBookingDetails() {
    this.agencyService.getbookingDetails().subscribe(
      (response) => {
        console.log(response);
        this.bookingData = response;
      },
      (error) => {
        console.log(error);
        
      }
    );
  }


}
