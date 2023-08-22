import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminService } from '../admin.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    constructor(private fb: FormBuilder, private http:HttpClient,private router:Router,private adminService:adminService) { }
  submit = false
  errorMessage: string = ""
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required,]]
  })

  get f() {
    return this.loginForm.controls
  }

  loginSubmit() { 
    this.submit = true
    if (this.loginForm.valid) { 
      const formData = this.loginForm.value

      this.adminService.adminLogin(formData).subscribe(
        (response:any) => { 
          if (response.message1) {
            console.log("successss hereee");
            
            console.log(response.message1);
            const token = response.token
            console.log(token,"adminToken");
            this.adminService.setToken(token)
            
            this.router.navigate(['/adminLayout'])
            
            
          } else if (response.message2) {
            console.log("message2 hereee");
            this.errorMessage = response.message2
          } else if (response.message3) { 
            console.log("message3 hereee");
            this.errorMessage = response.message3
          }
        },
        (error) => { 
          console.log(error);
          
        }
      )
    }
  }


}
