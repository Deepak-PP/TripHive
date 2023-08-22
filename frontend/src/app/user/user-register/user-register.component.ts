import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { userService } from '../user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: userService
  ) {}
  submit = false;
  emailsent = false;
  resend: Boolean = false;
  emailAlreadyRegistered = false;
  signupForm = this.fb.group({
    displayname: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/),
      ],
    ],

    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
    ],
  });

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submit = true;
    console.log('f', this.f);
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      console.log(user, 'userdata');

      this.userService.userRegister(user).subscribe(
        (response: any) => {
          this.resend = true;
          console.log('process is success', response);
          if (response.message === 'Email is already registered') {
            this.emailAlreadyRegistered = true;
          } else if (response.message === 'Sent for verification') {
            this.emailsent = true;
          }
          this.emailsent = true;
        },
        (error) => {
          this.emailsent = false;
          console.log('Process returns error', error);
        }
      );
    }
  }

  resendVerificationEmail() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      console.log(user, 'userdata');

      this.userService.userRegister(user).subscribe(
        (response) => {
          console.log('process is success', response);
          this.emailsent = true;
        },
        (error) => {
          if (error.error.message === 'Email is already registered') {
            this.emailAlreadyRegistered = true;
          } else {
            console.log('Process returns error', error);
          }
        }
      );
    }
  }
}
