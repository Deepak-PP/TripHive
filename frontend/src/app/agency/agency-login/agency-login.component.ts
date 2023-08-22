import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { agencyService } from '../agency.service'
import Swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css']
})
export class AgencyLoginComponent {

   constructor(private fb: FormBuilder, private http: HttpClient,private agencyAuthservice:agencyService,private router:Router) { }
  submit = false
  errorMessage: string = ""
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password:['',[Validators.required,]]
  })

  get f() {
    return this.loginForm.controls
  }

  onSubmitLogin() {
    this.submit = true
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      console.log(formData, "this is formdata");
      
      this.agencyAuthservice.agencyLogin(formData).subscribe(
        (response: any) => {
          if (response.message) {
            console.log(response);

            const token = response.token;
            console.log(token,"this is the agencytoken");
            
            this.agencyAuthservice.setToken(token);
            this.router.navigate(['/agencyLayout']);
          } else if (response.message1) {
            console.log('reached message1');

            this.errorMessage = 'Password Incorrect';
          } else if (response.message2) {
            this.errorMessage = 'E-mail or password is incorrect';
          } else if (response.message3) {
            this.agencyAuthservice.swalFire(response.message3);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      
    }
  }

}
