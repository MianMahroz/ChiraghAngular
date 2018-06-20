import { TokenStorage } from './../core/token.storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private router:Router,private token:TokenStorage) { }

  ngOnInit() {
    this.token.signOut();

    this.router.navigate(['../home']);
  }

}
