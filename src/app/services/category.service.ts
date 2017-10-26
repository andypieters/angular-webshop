import { Category } from './../models/category';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  categories$: Observable<Category[]>

  constructor(private db:AngularFireDatabase) { 
    this.categories$ = db.list('categories').valueChanges();
  }

}
