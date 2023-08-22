import { Component, OnInit } from '@angular/core';
import { agencyService } from '../agency.service';
import { response } from 'express';

@Component({
  selector: 'app-services-time',
  templateUrl: './services-time.component.html',
  styleUrls: ['./services-time.component.css'],
})
export class ServicesTimeComponent implements OnInit {
  registeredServices: [];
  agencyToken: string = '';
  constructor(private agencyService: agencyService) {}

  ngOnInit(): void {
    this.agencyToken = this.agencyService.getToken();
    this.fetchServiceData(this.agencyToken);
  }

  fetchServiceData(token: string) {
    this.agencyService.getAgencyData(token).subscribe((response) => {
      console.log(response.services, 'agencydataservices');
      this.registeredServices = response.services;
    });
  }
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const amPm = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${amPm}`;
  }

  submitForm(form: any): void {
    if (
      form.valid ||
      (form.controls.startTime.value === '' &&
        form.controls.endTime.value === '')
    ) {
      const { serviceName, startTime, endTime, Description } = form.value;
      const formattedStartTime = startTime ? this.formatTime(startTime) : null;
      const formattedEndTime = endTime ? this.formatTime(endTime) : null;
      // Here you can save the data to your collection or perform other actions.
      console.log(Description, 'description');

      const timeData = {
        serviceName: serviceName,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        Description: Description,
      };
      this.agencyService.timeDataSubmit(timeData).subscribe((response) => {
        if (response.message) {
          this.agencyService.swalFire(response.message);
        }
      });

      // Reset the form after submission
     
    }
     form.reset();
  }
}
