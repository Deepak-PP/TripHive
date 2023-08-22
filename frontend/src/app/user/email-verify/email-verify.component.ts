import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userService } from '../user.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css'],
})
export class EmailVerifyComponent implements OnInit {
  verificationStatus: string = '';
  verified = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService:userService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      const token = params['token'];

      this.verifyEmail(userId, token);
    });
  }

  verifyEmail(userId: string, token: string): void {
    this.userService.emailVerifyUser(userId, token).subscribe(
      (response: any) => {
        this.verificationStatus = response.message;
        this.verificationStatus = 'successs';
        this.verified = true;
      },
      (error: any) => {
        this.verificationStatus = 'Error occurred during email verification.';
      }
    );
  }
}
