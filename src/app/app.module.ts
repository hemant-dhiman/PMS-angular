import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './alert.service';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard';
import { BackEnd } from './Backend/backend';
import { JwtInterceptor } from './Backend/jwt.interceptor';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { PetEntryModule } from './pet-entry/pet-entry.module';
import { HomeModule } from './home/home.module';
import { UserUpdateModule } from './user-update/user-update.module';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    PetEntryModule,
    HomeModule,
    UserUpdateModule,
    //AlertModule,
  ],
  providers: [
    AlertService,
    UsersService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackEnd,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
