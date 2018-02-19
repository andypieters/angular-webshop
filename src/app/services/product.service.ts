import * as firebase from 'firebase';
import { Category } from './../models/category';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';

import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  private products: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) { 
    this.products = afs.collection<Product>('products');
  }

  save(product: Product){
    if(product.key){
      return this.update(product.key, product);
    } else {
      this.add(product);
    }
  }
  add(product: Product){
    return this.products.add(product).then(reference => {  
      product.key = reference.id;
      this.update(reference.id, product);
    });
  }
  getAll():Observable<Product[]>{
    return this.products.valueChanges();
  }
  get(key):Observable<Product>{
    return <any>this.products.doc(key).valueChanges();
  }
  fromRef(ref: firebase.firestore.DocumentReference): Observable<Product>{
    return this.afs.doc<Product>(ref.path).valueChanges();
  }
  getRef(key):AngularFirestoreDocument<Product>{
    return this.products.doc(key);
  }
  update(key: string, product:Product):Promise<void>{
    return this.products.doc(key).update(product);
  }  
  remove(key:string):Promise<void>{
    return this.products.doc(key).delete();
  }

}
