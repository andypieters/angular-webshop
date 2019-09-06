
import { of as observableOf, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from './../models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  user$: Observable<AppUser>;

  constructor(private fbAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = fbAuth.authState.pipe(switchMap(user => {
      if (!user) return observableOf(null);
      return this.userService.get(user.uid);
    }));
  }

  login(withProvider: string): Promise<boolean> {
    let provider = null;
    switch (withProvider) {
      case 'google':
        provider = new auth.GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new auth.FacebookAuthProvider();
        break;
    }
    return new Promise(resolve => {
      this.fbAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
        (result) => {
          this.userService.save(result.user);
          resolve(true)
        }
      );
    });
  }
  loginGoogle(): Promise<boolean> {
    return this.login('google');
  }
  loginFacebook(): Promise<boolean> {
    return this.login('facebook');
  }

  logout(): Promise<boolean> {
    return new Promise(
      (resolve) => this.fbAuth.auth.signOut().then(
        () => resolve(true)
      )
    );
  }
}
