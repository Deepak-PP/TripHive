import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userService } from '../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-booking-summary',
  templateUrl: './user-booking-summary.component.html',
  styleUrls: ['./user-booking-summary.component.css'],
})
export class UserBookingSummaryComponent implements OnInit {
  agencyId: string;
  bookingId: string;
  agencyData: any;
  bookingData: any;

  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.agencyId = params['agencyId'];
      this.bookingId = params['bookingId'];
    });

    this.fetchAgency(this.agencyId);
    this.fetchBooking(this.bookingId);
  }

  fetchAgency(id: any) {
    this.userService.getAgencyData(id).subscribe((response) => {
      console.log(response);
      this.agencyData = response;
    });
  }

  fetchBooking(id: any) {
    this.userService.getBookingData(id).subscribe(
      (response) => {
        console.log(response);
        this.bookingData = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // Customize the format as you need
  }
}
