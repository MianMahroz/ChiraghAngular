import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import {AppRoutingModule} from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import {ErrorDialogComponent} from './core/error-dialog.component';
import {UserService} from "./shared/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthService} from "./core/auth.service";
import { Interceptor} from "./core/inteceptor";
import { TokenStorage} from "./core/token.storage";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { OwnerDetailsComponent } from './SellerForm/owner-details/owner-details.component';


@NgModule({
  declarations: [   
    AppComponent,
    UserComponent,
    LoginComponent,
    ErrorDialogComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    FooterComponent,
    RegisterSuccessComponent,
    OwnerDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ErrorDialogComponent, UserService, AuthService, TokenStorage, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
