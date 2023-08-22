import { Component,OnInit } from '@angular/core';
import { userService } from '../user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-bookings-list',
  templateUrl: './user-bookings-list.component.html',
  styleUrls: ['./user-bookings-list.component.css'],
})
export class UserBookingsListComponent implements OnInit {
  bookingData: any;

  constructor(private userService: userService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    this.userService.getUserBookingData().subscribe(
      (response) => {
        console.log(response);
        this.bookingData = response;
      },
      (error) => {}
    );
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // Customize the format as you need
  }
}
