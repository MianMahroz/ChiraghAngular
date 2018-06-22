import { AuctionService } from './../../shared/auction.service';
import { auctionDTO } from './auctionDTO';

import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { SellerService } from '../../shared/seller.service';


@Component({
  selector: 'app-auction-fee-details',
  templateUrl: './auction-fee-details.component.html',
  styleUrls: ['./auction-fee-details.component.css']
})
export class AuctionFeeDetailsComponent implements OnInit {

  async ngAfterViewInit() {
		await this.loadScript('./assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  auctionDTO=new auctionDTO();

  constructor(private auctionService:AuctionService,private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }


  ngOnInit() {
    // this.token.savePropertyId('61');
    // this.token.saveUserName('BesterCapital2');
  }

  saveAuction(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        console.log(this.auctionDTO);
        this.auctionDTO.propertyId=this.token.getPropertyId();
        this.auctionDTO.userName=this.token.getuserName();
        if(this.token.getToken()!=null){
           this.auctionService.saveAuction(this.auctionDTO).subscribe(
             data=>{
                      console.log(data);
                      this.router.navigate(['/sellerSecurityPayments']);
             }
           );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser



}
