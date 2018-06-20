import { ToasterServiceService } from './toaster-service.service';

import { MaterialModule } from './material/material.component';
import { PaymentsService } from './shared/seller.payments.service';
import { AuctionService } from './shared/auction.service';
import { SellersecuritypaymentComponent } from './SellerForm/sellersecuritypayment/sellersecuritypayment.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
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
import { SellerService } from './shared/seller.service';
import { PoaDetailsComponent } from './SellerForm/poa-details/poa-details.component';
import { PropertyDetailsComponent } from './SellerForm/property-details/property-details.component';
import { PropertyService } from './shared/property.service';
import { PropertyFinancialsComponent } from './SellerForm/property-financials/property-financials.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PropertyRentalComponent } from './SellerForm/property-rental/property-rental.component';
import { AuctionFeeDetailsComponent } from './SellerForm/auction-fee-details/auction-fee-details.component';
import { ForgotPasswordRequestComponent } from './forgot-password-request/forgot-password-request.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { CustomFormsModule } from 'ng4-validators';
import { SignoutComponent } from './signout/signout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
// enableProdMode();
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
    PoaDetailsComponent,
    PropertyDetailsComponent,
    PropertyFinancialsComponent,
    FaqsComponent,
    AboutusComponent,
    PropertyRentalComponent,
    AuctionFeeDetailsComponent,
    ForgotPasswordRequestComponent,
    ForgotPasswordFormComponent,
    SellersecuritypaymentComponent,
    SignoutComponent,

  ],
  imports: [
    ToastModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    PasswordStrengthBarModule,
    CustomFormsModule,
    MaterialModule,


  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ToasterServiceService,ErrorDialogComponent, PaymentsService,AuctionService,UserService,SellerService,AuthService, TokenStorage, TokenStorage,SellerService,PropertyService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
