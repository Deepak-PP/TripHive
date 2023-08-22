import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.css'],
})
export class AdminLocationsComponent {
  locationForm: FormGroup;
  submit: Boolean = false;
  imagePreview:string 

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private adminService: adminService
  ) {}

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      image: [''],
    });
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.locationForm.get('image').setValue(file);

      const reader = new FileReader()
      reader.onload = () => { 
        this.imagePreview = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  get f() {
    return this.locationForm.controls;
  }

  onFormSubmit() {
    console.log("here");
    
    this.submit = true;
    if (this.locationForm.valid) {
      const locationData = this.locationForm.value;
      console.log(locationData);

      const formData = new FormData();
      formData.append('locationName', locationData.locationName);
      formData.append('image', locationData.image);

      this.adminService.postLocationData(formData).subscribe(
        (response) => {
          if (response.message1) {
            this.adminService.swalFire(response.message)
          } else if (response.message2) { 
             Swal.fire({
               title: response.message2,
               showClass: {
                 popup: 'animate__animated animate__fadeInDown',
               },
               hideClass: {
                 popup: 'animate__animated animate__fadeOutUp',
               },
             });
          }   

        },
        (error) => { 
          console.log(error);
          
        })
    }
  }
}
