import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule) },
  { path: '', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: '', loadChildren: () => import ('./agency/agency.module').then(mod => mod.AgencyModule) },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
