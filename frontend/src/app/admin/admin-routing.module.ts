import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AgencyRequestViewComponent } from './agency-request-view/agency-request-view.component';
import { AdminViewAgenciesComponent } from './admin-view-agencies/admin-view-agencies.component';
import { adminService } from './admin.service';
import { AdminLocationsComponent } from './admin-locations/admin-locations.component';


const routes: Routes = [
    {
        path: 'adminLayout', component: AdminLayoutComponent,
        children: [
            { path: 'adminDash', component: AdminDashComponent },
            { path: 'groupRequests', component: AdminRequestsComponent },
            { path: 'agencyRequestView/:id', component: AgencyRequestViewComponent },
            { path: 'agencies', component: AdminViewAgenciesComponent },
            {path:'locations',component:AdminLocationsComponent}
]    },
    { path: 'adminLogin', component: AdminLoginComponent,canActivate:[adminService] }
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }