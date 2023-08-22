import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  emailSent:Boolean = false


    constructor(private fb: FormBuilder, private http: HttpClient,private userAuthservice:userService,private router:Router) { }
    submit = false
    errorMessage: string = ""
    loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
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
        
        this.userAuthservice.userLogin(formData).subscribe(
          (response: any) => {
            if (response.message) {
              const token = response.token;
              this.userAuthservice.setToken(token);
              this.router.navigate(['/']);
            } else if (response.message1) {
              console.log('reached message1');

              this.errorMessage = response.message1;
            } else if (response.message2) {
              this.errorMessage = response.message2;
            } else if (response.message3) {
              this.emailSent = true;
              this.userAuthservice.swalFire(response.message3);
            }
          },
          (error) => {
            console.log(error);
          }
        );
        
      }
    }
  
  signInGoogle() { 
    this.userAuthservice.GoogleAuth().then((res) => { 
      const data = {
        credential:res,
      }

      this.userAuthservice.googleSignIn(data).subscribe((response) => { 
        if (response.message) { 
          const token = response.token
          this.userAuthservice.setToken(token)
          this.router.navigate(['/'])
        }
      },
        (error) => { 
          console.log(error);
          
        })
    })
  }
  


}
