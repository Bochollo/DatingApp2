import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User): void => {
        const user = response;
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          console.log('Login for: '+user.username);
        }
      })
    )
  }


  
  setCurrentUser(user: User) {
      this.currentUserSource.next(user);
  }

  deleteCurrentUser(user: User) {
    this.currentUserSource.next(undefined);
    this.currentUserSource.next(null!);
  }

  logout() {
    console.log('Loggin out...');
    
    const user: User = JSON.parse(localStorage.getItem('user') || '');
    console.log('Logout for: '+user.username)
    localStorage.removeItem('user');   
    this.deleteCurrentUser(user);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }


}
