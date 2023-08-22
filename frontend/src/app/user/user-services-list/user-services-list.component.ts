import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userService } from '../user.service';

import { response } from 'express';

@Component({
  selector: 'app-user-services-list',
  templateUrl: './user-services-list.component.html',
  styleUrls: ['./user-services-list.component.css'],
})
export class UserServicesListComponent implements OnInit {
  requestId: any;
  requestData: any;
  images: string[] = [];
  activeSlideIndexes: { [serviceId: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data'];
      this.requestId = JSON.parse(jsonString);
      console.log(this.requestId);
      this.fetchAgencyDetail(this.requestId);
    });
  }

  fetchAgencyDetail(id: string) {
    this.userService.getAgencyData(id).subscribe(
      (response) => {
        this.requestData = response;
        console.log(this.requestData, 'response');
        const services = this.requestData.services;
        console.log(services.length);
        for (let i = 0; i < services.length; i++) {
          const serviceImages = services[i].image;
          const serviceId = services[i]._id;
          this.images[services[i]._id] = serviceImages.map(
            (imageName: string) => {
              return `${this.userService.baseUrl}/uploads/${imageName}`;
            }
          );
          this.activeSlideIndexes[serviceId] = 0;
        }
        console.log(this.images, 'these are the images');
        this.startImageCarousels();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startImageCarousels() {
    for (const serviceId in this.images) {
      setInterval(() => {
        this.nextSlide(serviceId);
      }, 5000); // Change this value to adjust the slide duration
    }
  }

  nextSlide(serviceId: string) {
    const activeServiceIndex = this.activeSlideIndexes[serviceId];
    if (this.images[serviceId].length > 0) {
      this.activeSlideIndexes[serviceId] =
        (activeServiceIndex + 1) % this.images[serviceId].length;
    }
  }

  prevSlide(serviceId: string) {
    const activeServiceIndex = this.activeSlideIndexes[serviceId];
    if (this.images[serviceId].length > 0) {
      this.activeSlideIndexes[serviceId] =
        (activeServiceIndex - 1 + this.images[serviceId].length) %
        this.images[serviceId].length;
    }
  }

  agencyBookNow() {
    console.log(this.requestId);
    const id = this.requestId;
     const jsonString = JSON.stringify(this.requestId);
     this.router.navigate(['/bookUser', id], {
       queryParams: { data: jsonString },
     });
   }
}
