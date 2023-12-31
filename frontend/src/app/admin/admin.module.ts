import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'; 
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { AgencyRequestViewComponent } from './agency-request-view/agency-request-view.component';
import { AdminViewAgenciesComponent } from './admin-view-agencies/admin-view-agencies.component';
import { adminService } from './admin.service';
import { AdminLocationsComponent } from './admin-locations/admin-locations.component';
import { AdminInterceptor } from './admin.interceptor';
import { LoadingInterceptor } from '../loader/loading.interceptor';
import { BadgeService } from './badge.service';
import { ErrorInterceptor } from '../error.interceptor';

@NgModule({
  declarations: [
    AdminDashComponent,
    AdminLoginComponent,
    AdminNavComponent,
    AdminSidebarComponent,
    AdminRequestsComponent,
    AdminLayoutComponent,
    AgencyRequestViewComponent,
    AdminViewAgenciesComponent,
    AdminLocationsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    adminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    DatePipe,
    BadgeService,
  ],
})
export class AdminModule {}