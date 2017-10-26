import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable()
export class UserService {
  constructor(private db: AngularFireDatabase) { 
  }

  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  get(uid: string):Observable<AppUser>{
    return this.db.object('/users/'+uid).valueChanges();
  }

}
