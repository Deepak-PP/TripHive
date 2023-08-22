import { Component, OnInit } from '@angular/core';
import { agencyService } from '../agency.service';
import { response } from 'express';

@Component({
  selector: 'app-agency-bookings',
  templateUrl: './agency-bookings.component.html',
  styleUrls: ['./agency-bookings.component.css'],
})
export class AgencyBookingsComponent implements OnInit {
  agencyToken: string = '';
  bookingData:any

  constructor(private agencyService: agencyService) {}

  ngOnInit(): void {
    
    this.fetchBookingDetails();
  }

  fetchBookingDetails() {
    this.agencyService.getbookingDetails().subscribe(
      (response) => { 
        console.log(response);
        this.bookingData = response
        

      },
      (error) => { 

      })
    
  }
}
