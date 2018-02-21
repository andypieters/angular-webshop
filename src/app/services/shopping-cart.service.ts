import * as firebase from 'firebase';
import { ProductService } from './product.service';
import { Product } from './../models/product';
import { ShoppingCart, CartItem } from './shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AppUser } from './../models/app-user';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

export interface CartItem {
  product: firebase.firestore.DocumentReference;
  amount: number;
}
export interface ShoppingCart {
  key: string;
  items: AngularFirestoreCollection<CartItem>;
}

@Injectable()
export class ShoppingCartService {

  db: AngularFirestoreCollection<ShoppingCart>;

  constructor(private afs: AngularFirestore, private auth: AuthService, private products: ProductService) {
    this.db = afs.collection<ShoppingCart>('shopping-carts');
  }

  get cart$(): Observable<ShoppingCart> {
    return this.currentCart$.switchMap(currentCart => currentCart.valueChanges());
  }

  get cartId$(): Observable<string> {
    return this.auth.user$.switchMap(user => {
      if (user && user.cartId) return Observable.of(user.cartId);
      if (localStorage.getItem('cartId')) return Observable.of(localStorage.getItem('cartId'));
      return this.createCartId();
    });
  }

  get currentCart$(): Observable<AngularFirestoreDocument<ShoppingCart>> {
    return this.cartId$.map(cartId => {
      return this.db.doc(cartId);
    });
  }

  private createCartId(): Observable<string> {
    return Observable.fromPromise(this.afs.collection('shopping-carts').add({})).map(result => {
      localStorage.setItem('cartId', result.id);
      return result.id;
    });
  }

  setItem(productKey: string, amount: number) {
    return this.currentCart$.switchMap(currentCart =>{
        let item = { product: this.products.getRef(productKey).ref, amount: amount };
        return currentCart.collection<CartItem>('items').doc(productKey).set(item);
      }
    ).toPromise();
  }
  removeItem(productKey: string): Promise<void> {
    return this.currentCart$.switchMap(currentCart =>
      currentCart.collection('items').doc(productKey).delete()
    ).toPromise();
  }
  getItem(productKey: string): Observable<CartItem> {
    return this.currentCart$.switchMap(currentCart =>
        currentCart.collection('items').doc<CartItem>(productKey).valueChanges()
    );
  }
  getItems(): Observable<CartItem[]> {
    return this.currentCart$.switchMap(currentCart =>
      currentCart.collection<CartItem>('items').valueChanges()
    );
  }  
}
