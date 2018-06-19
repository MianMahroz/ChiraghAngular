import { TokenStorage } from './../core/token.storage';
import { Component, OnInit } from '@angular/core';

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
