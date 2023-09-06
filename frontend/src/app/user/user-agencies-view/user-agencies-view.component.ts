import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userService } from '../user.service';

@Component({
  selector: 'app-user-agencies-view',
  templateUrl: './user-agencies-view.component.html',
  styleUrls: ['./user-agencies-view.component.css'],
})
export class UserAgenciesViewComponent implements OnInit {
  requestData: any;
  requestId: any;
  agencies:any[]
  searchTerm: string = ''; // Property to store the search term

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: userService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data'];
      this.requestId = JSON.parse(jsonString);
      console.log(this.requestId);
      this.fetchLocationDatas();
    });
  }

  getImageUrl(imagePath: string): string {
    // Assuming this.userService.baseUrl is the base URL of your API
    return `${this.userService.baseUrl}/uploads/${imagePath}`;
  }

  fetchLocationDatas() {
    this.userService
      .viewLocationDetails(this.requestId)
      .subscribe((response) => {
        this.requestData = response;
        console.log(this.requestData, 'response');
        const agencyData = this.requestData.agencies;
        this.requestData.image = `${this.userService.baseUrl}/uploads/${this.requestData.image}`;
        this.agencies = agencyData
      });
  }

  viewServiceDetail(id: string) {
    this.userService
      .getAgencyData(id)
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
          this.router.navigate(['/servcieDetail', id], {
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
