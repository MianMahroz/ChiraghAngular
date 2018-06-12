import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../../core/token.storage';
import {Observable} from 'rxjs/Observable';
import {PaymentsService} from '../../shared/seller.payments.service';
import { sellersecuritysspaymentDTO } from './sellersecuritypaymentDTO';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-sellersecuritypayment',
  templateUrl: './sellersecuritypayment.component.html',
  styleUrls: ['./sellersecuritypayment.component.css']
})
export class SellersecuritypaymentComponent implements OnInit {
  constructor(private paymentService:PaymentsService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }
  sellersecuritypaymentdto=new sellersecuritysspaymentDTO();

  ngOnInit() {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.router.navigate(['../login']);
      return "Invalid Session";
  }
}

  paymentType(value:string):void{

    if(value=='credit'){
      this.sellersecuritypaymentdto.paymentType=1;
    }
    else if(value=='debit'){
      this.sellersecuritypaymentdto.paymentType=2;
    }
    else if(value=='bank'){
      this.sellersecuritypaymentdto.paymentType=3;
    }
  }

onsellersecuritypost(){

    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){

          this.sellersecuritypaymentdto.propertyId=this.token.getPropertyId();
          this.sellersecuritypaymentdto.paymentTitle=1;
          this.paymentService.postsellersecuritypayments(this.sellersecuritypaymentdto).subscribe(
            data1=>{
              console.log(data1);
                   if(data1.msg=="Seller Payments Submitted Successfully"){
                    // this.router.navigate(['../sellersecurityPayments']);

                   }//
                }//
          );//
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of onRegister
}
