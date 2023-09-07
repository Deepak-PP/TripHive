import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { agencyService } from '../agency.service';

import { response } from 'express';



@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.css'],
})
export class AgencyProfileComponent {
  profileImageForm: FormGroup;
  selectedImage: File // To store the selected image file
  imagePreviewUrl: string | ArrayBuffer | null = null; // To store the image preview URL

  agencyToken: string = '';
  agencyId: string = '';
  textError: string = '';
  agencyForm!: FormGroup;
  agencyName: String = '';
  adminApproved: Boolean = false;
  otherServiceData: { otherServiceName: string }[] = [];
  servicesData: {
    serviceName: string;
    image: File[];
    imagePreview?: string;
  }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private agencyService: agencyService
  ) {}
  submit = false;
  ngOnInit() {
    this.profileImageForm = this.formBuilder.group({
      profileImage: [null, { type: 'file' }], // Create a form control for the image upload
    });

    this.agencyForm = this.formBuilder.group({
      agencyName: ['', Validators.required],
      email: ['', Validators.required],
      capacity: ['', Validators.required],
      pricePerHead:['', Validators.required],
      location: ['', Validators.required],
      services: this.formBuilder.array([]),
      otherServices: this.formBuilder.array([]),
    });
    this.agencyToken = this.agencyService.getToken();

    this.fetchAgencyData(this.agencyToken);
  }
  get f() {
    return this.agencyForm.controls;
  }

  get serviceControls() {
    return this.agencyForm.get('services') as FormArray;
  }
  getServiceNameControl(index: number): FormControl {
    return this.serviceControls.at(index).get('serviceName') as FormControl;
  }
  getImageControl(index: number): FormControl {
    return this.serviceControls.at(index).get('image') as FormControl;
  }
  setImagePreview(index: number, imagePreview: string) {
    this.servicesData[index].imagePreview = imagePreview;
  }
  addOtherService() {
    const service = this.formBuilder.group({
      otherServiceName: new FormControl('', Validators.required),
    });
    this.otherServicesField.push(service);
    this.otherServiceData.push({ otherServiceName: '' }); // Add a corresponding entry in the otherServiceData array
  }

  removeOtherService(index: number) {
    const otherServices = this.agencyForm.get('otherServices') as FormArray;
    otherServices.removeAt(index);
    this.otherServiceData.splice(index, 1); // Remove the corresponding entry from the otherServiceData array
  }
  get otherServicesField() {
    return this.agencyForm.get('otherServices') as FormArray;
  }
  getOtherServiceNameControl(index: number): FormControl {
    return this.otherServicesField
      .at(index)
      .get('otherServiceName') as FormControl;
  }

  addService() {
    const service = this.formBuilder.group({
      serviceName: new FormControl('', Validators.required),
      image: new FormControl([], Validators.required),
    });
    this.serviceControls.push(service); // Add the service control to the services array
  }
  removeService(index: number) {
    this.serviceControls.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      // Set the selected image in the respective service control
      this.getImageControl(index).setValue(files);
      console.log('Selected image:', files);

      const serviceName = this.getServiceNameControl(index).value;
      console.log(serviceName, 'servicename');

      this.servicesData[index] = { serviceName, image: Array.from(files) };
      console.log(this.servicesData, 'service data');

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.setImagePreview(index, e.target.result);
      };
      for (const file of files) {
        reader.readAsDataURL(file);
      }
    }
  }

  fetchAgencyData(token: string) {
    console.log(this.agencyId, 'agencyIdhererer');

    this.agencyService.getAgencyData(token).subscribe((data) => {
      console.log(data);
      this.agencyId = data._id

      this.agencyForm.patchValue({
        agencyName: data.agencyName,
        email: data.email,
        capacity: data.maxCapacity,
        pricePerHead:data.pricePerHead,
        location: data.location,
      });
      this.patchServices(data.services);
      this.patchOtherServices(data.otherServices);
      console.log(data.adminApproved, 'adminapproval');
      console.log(data.services, 'services in data recieved');

      if (data.adminApproved === true) {
        this.adminApproved = true;
      }
      this.servicesData = data.services.map((service) => ({
        serviceName: service.serviceName,
        image: [], // Initialize the image array as empty for each service
      }));
      this.otherServiceData = new Array(data.otherServices.length).fill({
        otherServiceName: '',
      });

      // Populate servicesData with image URLs from the backend
      for (let i = 0; i < data.services.length; i++) {
        const imageFilename = data.services[i].image[0]; // Assuming 'image' contains the image URL from the backend
        console.log(imageFilename, 'name of the image');

        const imagePreview = `${this.agencyService.baseUrl}/uploads/${imageFilename}`; // Construct the full image URL
        this.setImagePreview(i, imagePreview); // Call the function to set the image preview for this service
      }
    });
  }

  patchServices(services: any[]) {
    const serviceArray = this.agencyForm.get('services') as FormArray;
    serviceArray.clear();

    for (const service of services) {
      const serviceGroup = this.formBuilder.group({
        serviceName: new FormControl(service.serviceName, Validators.required),
        image: new FormControl(service.image, Validators.required),
      });
      serviceArray.push(serviceGroup);
    }
  }
  patchOtherServices(otherServices: any[]) {
    const otherServiceArray = this.agencyForm.get('otherServices') as FormArray;
    otherServiceArray.clear();
    for (const otherService of otherServices) {
      const serviceGroup = this.formBuilder.group({
        otherServiceName: new FormControl(
          otherService.otherServiceName,
          Validators.required
        ),
      });
      otherServiceArray.push(serviceGroup);
    }
  }

  onFormSubmit() {
    this.submit = true;
    if (this.agencyForm.valid) {
      const agencyData = this.agencyForm.value;
      console.log(agencyData);

      console.log(agencyData);
      // const formData = new FormData();

      // Append other form data fields to the FormData object
      const servicesData = this.servicesData.map((serviceEntry) => {
        return {
          serviceName: serviceEntry.serviceName,
          image: serviceEntry.image,
        };
      });

      console.log(servicesData, 'servicesData before append');

      const formData = new FormData();
      formData.append('agencyName', agencyData.agencyName);
      formData.append('email', agencyData.email);
      formData.append('capacity', agencyData.capacity);
      formData.append('pricePerHead', agencyData.pricePerHead);
      formData.append('location', agencyData.location);

      agencyData.otherServices.forEach(
        (otherService: { otherServiceName: string }) => {
          formData.append('otherServices[]', otherService.otherServiceName);
        }
      );

      for (const serviceEntry of servicesData) {
        formData.append('services[]', serviceEntry.serviceName);
        for (const image of serviceEntry.image) {
          const imageName = `${serviceEntry.serviceName}-${image.name}`;
          formData.append('image', image, imageName);
        }
      }

      console.log(formData);

      this.agencyService.updateProfileAgency(formData).subscribe(
        (response: any) => {
          console.log(response);
          if (response.message) {
            this.agencyService.swalFire(response.message);
          }
        },
        (error) => {
          console.log(error);
          this.textError = 'Something went wrong';
          this.agencyService.swalFire(this.textError);
        }
      );
    }
  }

  
  
  onProfileImageSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedImage = inputElement.files[0];

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
    // this.selectedFile = <File>event.target.files[0];

  }

  profileImageSubmit(): void {
    if (this.profileImageForm.valid) {
      console.log(this.profileImageForm.value, 'profileimageformvalue');

      const formData = new FormData();
      formData.append('profileImage', this.selectedImage);
      formData.append('agencyId',this.agencyId)

      // formData.append('image', this.selectedFile, this.selectedFile.name);

      this.agencyService.profileImageUpload(formData).subscribe(
        (response) => { 
          if (response.message) { 
            this.agencyService.swalFire(response.message)
          }

        },
        (error) => {
          console.log(error);
          

        }
      )
    }
  }
}
