import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  add(product: Product){
    return this.db.list('products').push(product);
  }

  getAll():Observable<Product[]>{
    return this.db.list('products').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  get(key){
    return this.db.object('products/'+key).snapshotChanges().map(item => {
      return { key: item.payload.key, ...item.payload.val() };
    });
  }
  update(key: string, product:Product){
    return this.db.object('products/'+key).update(product);
  }

}
