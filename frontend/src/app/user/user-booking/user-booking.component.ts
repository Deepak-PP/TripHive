import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { userService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { response } from 'express';

declare var Razorpay:any

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
})
export class UserBookingComponent implements OnInit {
  bookingId: any;
  peopleCount: Number;
  profilePicture:any
  formData: any;
  requestId: any;
  bookingForm: FormGroup;
  totalAmount: Number;
  submit: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: userService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data'];
      this.requestId = JSON.parse(jsonString);
      console.log(this.requestId);
      this.initForm();
    });

    this.fetchAgency();
  }
  fetchAgency() {
    this.userService.getAgencyData(this.requestId).subscribe(
      (response) => {
        const responseImage = response.profielImage;
        this.profilePicture = `${this.userService.baseUrl}/uploads/${responseImage}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initForm() {
    this.bookingForm = this.formBuilder.group({
      email: ['', Validators.required],
      noOfTravellers: ['', Validators.required],
      specialRequests: ['', Validators.required],
      dateOfTravel: [null, Validators.required],
      paymentMethod: [''],
      paymentStatus: ['Pending'],
      agencyId: this.requestId,
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  submitBookingForm() {
    console.log('herer');
    this.submit = true;

    if (this.bookingForm.valid) {
      console.log('formvalidddd');

      this.formData = this.bookingForm.value;
      console.log(this.formData, 'formData');
      this.userService.bookingSubmit(this.formData).subscribe(
        (response) => {
          console.log(response, 'response hererere');
          if (response.message) {
            console.log(response.message, 'duplicate');
            Swal.fire({
              icon: 'info',
              title: 'Oops!',
              text: response.message,
            });
          } else {
            this.bookingId = response;

            console.log(response);

            this.payNow(response);
          }
        },
        (error) => {
          console.log(error, 'error');
        }
      );
    }
  }

  payNow(bookingId: any) {
    console.log('reached here');

    if (this.submit === true) {
      console.log(this.formData.noOfTravellers, 'herepayniow no of travellers');
      const baseAmount: number = 120000;
      this.totalAmount = baseAmount * this.formData.noOfTravellers;

      const razorPayOptions = {
        description: 'TripHive Payment',
        currency: 'INR',
        amount: this.totalAmount,
        name: 'TripHive.',
        key: environment.razorPayKey,
        image: '../../../assets/images/logotriphive.jpg',
        handler: (response: any) => {
          console.log(response);
          console.log(response.status_code);
          const totalAmount = this.totalAmount;
          const data = {
            response,
            bookingId,
            totalAmount,
          };
          this.userService.verifyPayment(data).subscribe(
            (response) => {
              console.log(response);
              if (response.message === 'Payment Successfull') {
                this.router.navigate([
                  '/bookingSummary',
                  this.requestId,
                  this.bookingId,
                ]);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        prefill: {
          name: 'TripHive.',
          email: environment.persEmail,
          phone: environment.persPhone,
        },
        theme: {
          color: '#f37254',
        },
        modal: {
          ondismiss: () => {
            console.log('dismissed');
          },
        },
      };

      const successCallback = (paymentId: any) => {
        console.log(paymentId);
      };

      const failureCallback = (error: any) => {
        console.log(error);
      };

      var rzl = new Razorpay(razorPayOptions, successCallback, failureCallback);

      rzl.open();
    }
  }
}
