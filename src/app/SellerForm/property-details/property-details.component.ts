import { Component, OnInit } from '@angular/core';
import { PropertyDetailsDto } from './propertymodel';
import { PropertyService } from '../../shared/property.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyDetailsDto=new PropertyDetailsDto();

  constructor(private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
 
  ngOnInit() {
  }

  

  addPropertyDetails(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
            this.propertyDetailsDto.propertyId=98;
            this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
                propertydata=>{
                    console.log(propertydata);
                    this.router.navigate(['../propertyFinancialDetails']);
                }    
              );//end of propertySubscription
            }//end of if
        
     }//end of outer data predicate
    );//end of outer subscription
    
  }//end of loginChiraghUser



}
