import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  locations: any[] = [];

  constructor(private userService: userService, private router:Router) {}

  ngOnInit() {
    this.fetchLocations();
  }

  fetchLocations() {
    this.userService.getLocationData().subscribe(
      (response) => {
        this.locations = response;
        this.locations.forEach((location: any) => {
          location.image = `${this.userService.baseUrl}/uploads/${location.image}`;
        });
      },
      (error) => {
        console.log('error fetching data', error);
      }
    );
  }

  locationPage(id: any) {
    console.log("locations hererere");
    
       return this.userService
         .viewLocationDetails(id)
         .pipe(
           map((response) => {
             return response;
           })
         )
         .subscribe(
           (response) => {
             console.log('Response:', response._id);
             // Do something with the response here
             const jsonString = JSON.stringify(response._id);
             this.router.navigate(['/locationDetail', id], {
               queryParams: { data: jsonString },
             });
           },
           (error) => {
             console.error('Error:', error);
             // Handle errors if any
           }
         );
    
    

  }
}
