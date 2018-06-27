import { AdminLoginComponent } from './../admin/admin-login/admin-login.component';
import { SellerDashboardComponent } from './../seller-dashboard/seller-dashboard.component';
import { PropertySuccessMsgComponent } from '../SellerForm/property-success-msg/property-success-msg.component';
import { SignoutComponent } from './../signout/signout.component';
import { SellersecuritypaymentComponent } from './../SellerForm/sellersecuritypayment/sellersecuritypayment.component';
import { ForgotPasswordFormComponent } from './../forgot-password-form/forgot-password-form.component';
import { ForgotPasswordRequestComponent } from './../forgot-password-request/forgot-password-request.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../register/register.component';
import {ConfirmEmailComponent} from '../confirm-email/confirm-email.component';
import { RegisterSuccessComponent } from '../register-success/register-success.component';
import { OwnerDetailsComponent } from '../SellerForm/owner-details/owner-details.component';
import { PoaDetailsComponent } from '../SellerForm/poa-details/poa-details.component';
import { PropertyDetailsComponent } from '../SellerForm/property-details/property-details.component';
import { PropertyFinancialsComponent } from '../SellerForm/property-financials/property-financials.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { PropertyRentalComponent } from '../SellerForm/property-rental/property-rental.component';
import { AuctionFeeDetailsComponent } from '../SellerForm/auction-fee-details/auction-fee-details.component';
import {PrivacypolicyComponent} from '../privacypolicy/privacypolicy.component';
import { TermsconditionsComponent } from '../termsconditions/termsconditions.component';
import {DisclamierComponent } from "../disclamier/disclamier.component";
import {HowitworksComponent  } from "../howitworks/howitworks.component";
import {ResourcesComponent}  from "../resources/resources.component";
import { InternationalpropertiesComponent } from '../internationalproperties/internationalproperties.component';
import { BuyersInvestorsComponent } from '../buyers-investors/buyers-investors.component';
import { PressreleasesComponent } from '../pressreleases/pressreleases.component';
import { MortagecalculatorComponent } from '../mortagecalculator/mortagecalculator.component';
import { ForbuyersComponent } from '../forbuyers/forbuyers.component';
import { ForhomeownersComponent } from '../forhomeowners/forhomeowners.component';
import { ChangepasswordComponent  } from '../changepassword/changepassword.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path : '', component : HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmEmail', component: ConfirmEmailComponent },
  { path: 'registrationSuccess/:token', component: RegisterSuccessComponent },
  { path: 'sellerOwnerDetails', component: OwnerDetailsComponent },
  { path: 'sellerOwnerDetails/:action', component: OwnerDetailsComponent },
  { path: 'sellerPoaDetails/:action', component: PoaDetailsComponent },
  { path: 'sellerPoaDetails', component: PoaDetailsComponent },
  { path: 'propertyDetails', component: PropertyDetailsComponent },
  { path: 'propertyDetails/:action', component: PropertyDetailsComponent },
  { path: 'propertyFinancialDetails', component: PropertyFinancialsComponent },
  { path: 'propertyFinancialDetails/:action', component: PropertyFinancialsComponent },
  { path: 'propertyRental', component: PropertyRentalComponent },
  { path: 'propertyRental/:action', component: PropertyRentalComponent },
  { path: 'auctionFeeDetails', component: AuctionFeeDetailsComponent },
  { path: 'auctionFeeDetails/:action', component: AuctionFeeDetailsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'forgotPasswordRequest', component: ForgotPasswordRequestComponent },
  { path: 'forgotPasswordForm/:token', component: ForgotPasswordFormComponent },
  { path: 'forgotPasswordForm/:token', component: ForgotPasswordFormComponent },
  { path: 'sellerSecurityPayments',component:SellersecuritypaymentComponent},
  { path: 'signout',component:SignoutComponent},
  { path: 'propertySuccess',component:PropertySuccessMsgComponent},
  { path: 'privacypolicy',component:PrivacypolicyComponent},
  { path: 'termsconditions',component:TermsconditionsComponent},
  { path: 'disclamier',component:DisclamierComponent },
  { path:'howitworks',component:HowitworksComponent},
  { path:'resources',component:ResourcesComponent},
  { path:'internationalproperties',component:InternationalpropertiesComponent},
  { path:'buyersandinvestors',component:BuyersInvestorsComponent},
  { path:'pressrelease',component:PressreleasesComponent},
  { path:'mortagecalculator',component:MortagecalculatorComponent},
  { path:'forbuyers',component:ForbuyersComponent},
  { path:'forhomeowners',component:ForhomeownersComponent},
  { path:'sellerDashboard',component:SellerDashboardComponent},
  { path:'changepassword',component:ChangepasswordComponent},




  //admin module path
  {path:'adminlogin',component:AdminLoginComponent},
];

@NgModule({
  imports: [
    // ,{useHash:true}
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
