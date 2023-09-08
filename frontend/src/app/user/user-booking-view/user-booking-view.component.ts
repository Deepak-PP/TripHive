import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userService } from '../user.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-booking-view',
  templateUrl: './user-booking-view.component.html',
  styleUrls: ['./user-booking-view.component.css'],
})
export class UserBookingViewComponent implements OnInit {
  bookingId: string;
  bookingData: any;
  agency: any;

  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data'];
      this.bookingId = JSON.parse(jsonString);
      console.log(this.bookingId);
    });
    this.fetchBooking(this.bookingId);
  }

  fetchBooking(id: any) {
    this.userService.getBookingData(id).subscribe(
      (response) => {
        console.log(response);
        this.bookingData = response;
        this.agency = this.bookingData.agencyName.agencyName;
        console.log(this.agency);
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

  cancelBooking(id: any) { 
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this booking',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.bookingCancel(id).subscribe(
          (response) => {
            if (response) { 
              Swal.fire(
                'Cancelled!',
                'Your booking has been cancelled<br>Refund will be initiated to your UPI ID',
                'success'
              );

            }
           });

        
      }
    })
   

  }
}
