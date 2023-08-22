import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { agencyService } from '../agency.service';

@Component({
  selector: 'app-agent-email-verify',
  templateUrl: './agent-email-verify.component.html',
  styleUrls: ['./agent-email-verify.component.css']
})
export class AgentEmailVerifyComponent {

   verificationStatus: string = '';
  verified = false

  constructor(private route: ActivatedRoute, private http: HttpClient,private agencyService:agencyService) { }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      const token = params['token'];

      this.verifyEmail(userId, token);
    });
   }
  
  verifyEmail(userId: string, token: string): void {
    this.agencyService.emailVerify(userId, token).subscribe(
      (response: any) => {
        if (response.message === 'NoAccount' || 'Invalid link') {
          this.verificationStatus = 'Failed';
        }
        this.verified = true;
        this.verificationStatus = response.message;
      },
      (error: any) => {
        this.verificationStatus = 'Error occurred during email verification.';
      }
    );
  }

}
