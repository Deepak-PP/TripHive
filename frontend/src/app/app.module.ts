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
import { SpinnerComponent } from './loader/spinner/spinner.component';
import { LoadingInterceptor } from './loader/loading.interceptor';
import { ErrorInterceptor } from './error.interceptor';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    BadGatewayComponent,
    BadRequestComponent,
    CommonErrorComponent,
    InternalServerComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
