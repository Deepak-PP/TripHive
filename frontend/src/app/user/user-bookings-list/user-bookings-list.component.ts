import { Component,OnInit } from '@angular/core';
import { userService } from '../user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { response } from 'express';


@Component({
  selector: 'app-user-bookings-list',
  templateUrl: './user-bookings-list.component.html',
  styleUrls: ['./user-bookings-list.component.css'],
})
export class UserBookingsListComponent implements OnInit {
  bookingData: any;

  constructor(
    private userService: userService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    this.userService.getUserBookingData().subscribe(
      (response) => {
        console.log(response);
        this.bookingData = response.filter(
          (booking) => booking.bookingStatus !== 'cancelled'
        );
      },
      (error) => {}
    );
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // Customize the format as you need
  }

  chat(id: string) {
    console.log(id, 'id got at the funciton');

    if (this.userService.isLoggedIn) {
      this.userService.chatConnection(id).subscribe(
        (response) => {
          console.log(response);

          if (response) {
            const jsonString = JSON.stringify(id);
            this.router.navigate(['/chat', id], {
              queryParams: { data: jsonString },
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
  }

  bookView(date: any) { 
    this.userService.viewBookingDetail(date).subscribe(
      (response) => { 
        if (response) {
          console.log(response, 'bookresponse');
          const id = response._id;
          console.log(id,"bookid");
          
          const jsonString = JSON.stringify(id);
          this.router.navigate(['/viewBooking', id], {
            queryParams: { data: jsonString },
          });
        } else { 
          console.log("no res");
          
        }
        
      },
      (error) => { 
        console.log(error);
        
      }
    )

  }
}
