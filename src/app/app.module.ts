import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { EventModule } from './event/event.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthTokenInterceptor } from './shared/interceptor/auth-token.interceptor';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginPageComponent,
    InscriptionPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EventModule,
    HttpClientModule
  ],
  providers: [
    { provide : "urlBase", useValue : "https://localhost:7245/"},
    { provide : HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
