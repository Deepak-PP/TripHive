import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { AgentEmailVerifyComponent } from './agent-email-verify/agent-email-verify.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyDashComponent } from './agency-dash/agency-dash.component';
import { AgencyLayoutComponent } from './agency-layout/agency-layout.component';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';
import { agencyService } from './agency.service';
import { ServicesTimeComponent } from './services-time/services-time.component';
import { AgencyBookingsComponent } from './agency-bookings/agency-bookings.component';
import { ChatsComponent } from './chats/chats.component';



const routes: Routes = [
  {
    path: 'agencyLayout',
    component: AgencyLayoutComponent,
    children: [
      { path: 'agencyDash', component: AgencyDashComponent },
      { path: 'agencyProfile', component: AgencyProfileComponent },
      { path: 'servicesTime', component: ServicesTimeComponent },
      {path:'agencyBookings',component:AgencyBookingsComponent}
    ],
  },
  { path: 'agencyRegister', component: AgencyRegisterComponent },
  {
    path: 'agencyLogin',
    component: AgencyLoginComponent,
    canActivate: [agencyService],
  },

  {
    path: 'agencyVerify/:id/verify/:token',
    component: AgentEmailVerifyComponent,
    canActivate: [agencyService],
  },
  {path:'chats',component:ChatsComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AgencyRoutingModule { }