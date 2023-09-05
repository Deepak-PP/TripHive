import { Component } from '@angular/core';
import { agencyService } from '../agency.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agency-dash',
  templateUrl: './agency-dash.component.html',
  styleUrls: ['./agency-dash.component.css'],
})
export class AgencyDashComponent {
  bookingsCount: number;
  locationsCount: number;
  usersCount: number;
  agencyData: any;
  bookingData: any;
  totalAmount: number;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(
    private agencyService: agencyService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    this.agencyService.getDashboardCount().subscribe((response) => {
      this.agencyData = response.agencyData;
      this.bookingsCount = response.bookingCount;
      this.totalAmount = response.totalAmount;
      this.bookingData = response.bookingData;
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
