import { Component, OnInit } from '@angular/core';
import { adminService } from '../admin.service';
import { DatePipe } from '@angular/common';
import { agencyService } from 'src/app/agency/agency.service';
import { response } from 'express';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {
  bookingsCount: number;
  locationsCount: number;
  usersCount: number;
  agencyCount: number;
  bookingData: any;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(private adminService: adminService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.adminService.getDashboardCounts().subscribe(
      (response) => {
        console.log(response.counts);
        this.bookingsCount = response.counts.bookingCount;
        this.locationsCount = response.counts.locationCount;
        this.usersCount = response.counts.userCount;
        this.agencyCount = response.counts.agencyCount;
      },
      (error) => {
        console.log(error);
      }
    );

    this.fetchBookingData();
  }

  fetchBookingData() {
    this.adminService.getBookingData().subscribe((response) => {
      this.bookingData = response.result;
      console.log(this.bookingData, 'booking data hererere');
    });
  }

  get totalPages(): number {
    return Math.ceil(this.bookingData.length / this.pageSize);
  }

  get pagedBookingData(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.bookingData.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // Customize the format as you need
  }
}
