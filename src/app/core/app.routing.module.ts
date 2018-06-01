import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../register/register.component';
import {ConfirmEmailComponent} from '../confirm-email/confirm-email.component';
import { RegisterSuccessComponent } from '../register-success/register-success.component';
import { OwnerDetailsComponent } from '../SellerForm/owner-details/owner-details.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path : '', component : HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmEmail', component: ConfirmEmailComponent },
  { path: 'registrationSuccess/:token', component: RegisterSuccessComponent },
  { path: 'sellerOwnerDetails', component: OwnerDetailsComponent },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
