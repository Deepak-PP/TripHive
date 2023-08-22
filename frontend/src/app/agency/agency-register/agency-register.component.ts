import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { agencyService } from '../agency.service';


const httpOptions = {
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Component({
  selector: 'app-agency-register',
  templateUrl: './agency-register.component.html',
  styleUrls: ['./agency-register.component.css']
})
export class AgencyRegisterComponent {

  constructor(private fb: FormBuilder, private http: HttpClient,private agencyService:agencyService) { }
  submit = false
  emailsent = false
  response = false
  resend: Boolean = false
  emailAlreadyRegistered:Boolean = false
  message: string="";
    signupForm = this.fb.group({
     agencyName: ['', [Validators.required]],
    
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  
    get f() { 
    return this.signupForm.controls
    }
  
    onSubmit() { 
    this.submit = true
    console.log("f", this.f);
    if (this.signupForm.valid) { 
      const agency = this.signupForm.value
      console.log(agency, "userdata");
      
      this.agencyService.agencyRegister(agency).subscribe(
        (response: any) => {
          this.resend = true;
          console.log('process is success', response);
          if (response.message === 'Email is already registered') {
            this.emailAlreadyRegistered = true;
          } else if (response.message === 'Sent for verification') {
            this.emailsent = true;
          }
          this.emailsent = true;

          this.message = response.message;
          this.response = true;
        },
        (error) => {
          console.log('Process returns error', error);
        }
      );
      
    }
    
  }

}
