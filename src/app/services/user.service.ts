import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {
  }

  save(user: any) {
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
