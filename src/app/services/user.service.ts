import { AngularFirestore } from 'angularfire2/firestore';
import { NavbarComponent } from './../navbar/navbar.component';
import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {
  }

  save(user: firebase.User) {
    let afsUser = this.afs.doc<AppUser>('users/' + user.uid);
    
    let appUser: AppUser;
    appUser = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
    afsUser.update(appUser).catch(() => afsUser.set(appUser));
  }

  get(uid: string): Observable<AppUser> {
    let afsUser = this.afs.doc<AppUser>('users/' + uid);

    return afsUser.valueChanges();
  }

}
