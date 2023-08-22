import { Component,OnInit } from '@angular/core';
import { agencyService } from '../agency.service';
import { Router } from '@angular/router';

import { response } from 'express';


@Component({
  selector: 'app-agency-sidebar',
  templateUrl: './agency-sidebar.component.html',
  styleUrls: ['./agency-sidebar.component.css'],
})
export class AgencySidebarComponent implements OnInit {
  agencyToken: string = '';
  profilePicture:any

  constructor(
    private agencyAuthService: agencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agencyToken = this.agencyAuthService.getToken()
    this.fetchagencyData(this.agencyToken);
  }

  fetchagencyData(token:string) {
    this.agencyAuthService.getAgencyData(token).subscribe(
      (response) => { 
        console.log(response,"responseeeee");
        
        const responseImage = response.profielImage;
        console.log(responseImage, 'responseeeeeimageee');
        
        this.profilePicture = `${this.agencyAuthService.baseUrl}/uploads/${responseImage}`;
        

      },
      (error) => {
        console.log(error);
        

      }
    )
  }

  agencyLogout() {
    this.agencyAuthService.removeToken();
    this.router.navigate(['/agencyLogin']);
  }
}
