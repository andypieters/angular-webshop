import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  categories$: Observable<Category[]>

  constructor(private afs: AngularFirestore) {
    this.categories$ =afs.collection<Category>('categories').valueChanges();
  }

  getRef(key: string){
    return this.afs.doc<Category>('categories/'+key);
  }

}
