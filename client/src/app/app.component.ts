//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Users';
  users: any;

  
  constructor(private accountService: AccountService) {}

  ngOnInit() {
  
    this.setCurrentUser();
  }


  setCurrentUser() {
    try {
          const user: User = JSON.parse(localStorage.getItem('user') || '') as User;
          this.accountService.setCurrentUser(user);
          console.log('Logged in as '+user.username);
         
    } catch(e) {
      console.log('setCurrentUser: No current user!!');
    }  

  }  




}


