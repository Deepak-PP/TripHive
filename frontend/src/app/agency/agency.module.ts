import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';
import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyDashComponent } from './agency-dash/agency-dash.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyNavComponent } from './agency-nav/agency-nav.component';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { AgentEmailVerifyComponent } from './agent-email-verify/agent-email-verify.component';
import { AgencySidebarComponent } from './agency-sidebar/agency-sidebar.component';
import { AgencyLayoutComponent } from './agency-layout/agency-layout.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { agencyService } from './agency.service';
import { AgencyInterceptor } from './agency.interceptor';
import { ServicesTimeComponent } from './services-time/services-time.component';
import { AgencyBookingsComponent } from './agency-bookings/agency-bookings.component';
import { ChatsComponent } from './chats/chats.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ContactsComponent } from './chats/contacts/contacts.component';



@NgModule({
  declarations: [
    AgencyDashComponent,
    AgencyLoginComponent,
    AgencyNavComponent,
    AgencyProfileComponent,
    AgencyRegisterComponent,
    AgentEmailVerifyComponent,
    AgencySidebarComponent,
    AgencyLayoutComponent,
    ServicesTimeComponent,
    AgencyBookingsComponent,
    ChatsComponent,
    ContactsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgencyRoutingModule,
    CloudinaryModule,
    SocketIoModule.forRoot({ url: 'http://localhost:4200' }),
  ],
  providers: [
    agencyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AgencyInterceptor,
      multi: true,
    },
    DatePipe,
  ],
})
export class AgencyModule {}