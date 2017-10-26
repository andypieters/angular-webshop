import { Subscription } from 'rxjs/Subscription';
import { UserService } from './user.service';
import { AppUser } from './../models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<AppUser>;

  constructor(private fbAuth:AngularFireAuth, private userService: UserService) {
    this.user$ = fbAuth.authState.switchMap(user => {
      if(!user) return Observable.of(null);      
      return this.userService.get(user.uid);
    });
  }

  loginGoogle():Promise<boolean>{
    return new Promise(resolve => {
      this.fbAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        (result) => {
          this.userService.save(result.user);
          resolve(true)
        }  
      );
    });
  }
  loginFacebook():Promise<boolean>{
    return new Promise(resolve => {
      this.fbAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (result) => {
          this.userService.save(result.user);
          resolve(true)
        }  
      );
    });
  }

  logout():Promise<boolean>{
    return new Promise(
      (resolve) => this.fbAuth.auth.signOut().then(
        () => resolve(true)
      )
    );
  }
}
