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
import { UserChatComponent } from './user-chat/user-chat.component';



const routes: Routes = [
  { path: '', component: UserHomeComponent },
  {
    path: 'userLogin',
    component: UserLoginComponent,
    canActivate: [userService],
  },
  {
    path: 'userRegister',
    component: UserRegisterComponent,
    canActivate: [userService],
  },
  {
    path: ':id/verify/:token',
    component: EmailVerifyComponent,
    canActivate: [userService],
  },
  { path: 'locationDetail/:id', component: UserAgenciesViewComponent },
  { path: 'servcieDetail/:id', component: UserServicesListComponent },
  { path: 'bookUser/:id', component: UserBookingComponent },
  {
    path: 'bookingSummary/:agencyId/:bookingId',
    component: UserBookingSummaryComponent,
  },
  { path: 'listBookings', component: UserBookingsListComponent },
  {path:'chat',component:UserChatComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }