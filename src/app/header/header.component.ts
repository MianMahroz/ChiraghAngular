import { TokenStorage } from './../core/token.storage';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { Router } from '@angular/router';
import { ToasterServiceService } from './../toaster-service.service';
import { UserService } from './../shared/user.service';
import { PropertyService } from './../shared/property.service';
import { personalInfoDTO } from './../register/personalInfoDTO';
import {ModalGalleryModule,Image} from 'angular-modal-gallery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private tokenService:TokenStorage) { }
  userName:string;
  ngOnInit() {
    if(this.tokenService.getuserName()!=null)
    this.userName=this.tokenService.getuserName();
  
  }


}
