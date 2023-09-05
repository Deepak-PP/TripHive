import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BadGatewayComponent } from './errors/bad-gateway/bad-gateway.component';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { CommonErrorComponent } from './errors/common-error/common-error.component';
import { InternalServerComponent } from './errors/internal-server/internal-server.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

//I keep the new line
@NgModule({
  declarations: [AppComponent, BadGatewayComponent, BadRequestComponent, CommonErrorComponent, InternalServerComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
