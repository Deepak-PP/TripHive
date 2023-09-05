import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { InternalServerComponent } from './errors/internal-server/internal-server.component';
import { BadGatewayComponent } from './errors/bad-gateway/bad-gateway.component';
import { CommonErrorComponent } from './errors/common-error/common-error.component';



const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule) },
  { path: '', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: '', loadChildren: () => import('./agency/agency.module').then(mod => mod.AgencyModule) },
  { path: '400', component: BadRequestComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '502', component: BadGatewayComponent },
  { path: 'error', component: CommonErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
