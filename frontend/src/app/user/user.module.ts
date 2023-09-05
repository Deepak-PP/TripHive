import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';


import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { userService } from './user.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { UserAgenciesViewComponent } from './user-agencies-view/user-agencies-view.component';
import { UserInterceptor } from './user.interceptor';
import { UserServicesListComponent } from './user-services-list/user-services-list.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserBookingSummaryComponent } from './user-booking-summary/user-booking-summary.component';
import { UserBookingsListComponent } from './user-bookings-list/user-bookings-list.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';

import { UserChatComponent } from './user-chat/user-chat.component';

import { ContactComponent } from './user-chat/contact/contact.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { AgencyFilterPipe } from './agency-filter.pipe';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserNavComponent,
    UserLoginComponent,
    UserRegisterComponent,
    EmailVerifyComponent,
    UserAgenciesViewComponent,
    UserServicesListComponent,
    UserBookingComponent,
    UserBookingSummaryComponent,
    UserBookingsListComponent,
    UserChatComponent,
    ContactComponent,
    UserFooterComponent,
    AgencyFilterPipe,
  ],
  imports: [
    RouterModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    SocketIoModule.forRoot({ url: 'http://localhost:4200' }),
    ToastrModule.forRoot(),
  ],

  providers: [
    userService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
    DatePipe,
  ],
})
export class UserModule {}