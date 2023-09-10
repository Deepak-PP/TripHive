import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { userService } from './user.service';
import { UserAgenciesViewComponent } from './user-agencies-view/user-agencies-view.component';
import { UserServicesListComponent } from './user-services-list/user-services-list.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserBookingSummaryComponent } from './user-booking-summary/user-booking-summary.component';
import { UserBookingsListComponent } from './user-bookings-list/user-bookings-list.component';
import { UserGuard, UserGuardLet } from '../guards/user.guard';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserBookingViewComponent } from './user-booking-view/user-booking-view.component';



const routes: Routes = [
  { path: '', component: UserHomeComponent },
  {
    path: 'userLogin',
    component: UserLoginComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'userRegister',
    component: UserRegisterComponent,
    canActivate: [UserGuard],
  },
  {
    path: ':id/verify/:token',
    component: EmailVerifyComponent,
    canActivate: [UserGuard],
  },
  { path: 'locationDetail/:id', component: UserAgenciesViewComponent },
  { path: 'servcieDetail/:id', component: UserServicesListComponent },
  {
    path: 'bookUser/:id',
    component: UserBookingComponent,
    canActivate: [UserGuardLet],
  },
  {
    path: 'bookingSummary/:agencyId/:bookingId',
    component: UserBookingSummaryComponent,
    canActivate: [UserGuardLet],
  },
  {
    path: 'listBookings',
    component: UserBookingsListComponent,
    canActivate: [UserGuardLet],
  },
  {
    path: 'chat/:id',
    component: UserChatComponent,
    canActivate: [UserGuardLet],
  },
  { path: 'viewBooking/:id', component: UserBookingViewComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }