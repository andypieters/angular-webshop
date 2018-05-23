
import {from as observableFrom, of as observableOf,  Observable } from 'rxjs';

import {map, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import { ProductService } from './product.service';
import { Product } from './../models/product';
import { ShoppingCart, CartItem } from './shopping-cart.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AppUser } from './../models/app-user';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';




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
    return this.currentCart$.pipe(switchMap(currentCart => currentCart.valueChanges()));
  }

  get cartId$(): Observable<string> {
    return this.auth.user$.pipe(switchMap(user => {
      if (user && user.cartId) return observableOf(user.cartId);
      if (localStorage.getItem('cartId')) return observableOf(localStorage.getItem('cartId'));
      return this.createCartId();
    }));
  }

  get currentCart$(): Observable<AngularFirestoreDocument<ShoppingCart>> {
    return this.cartId$.pipe(map(cartId => {
      return this.db.doc(cartId);
    }));
  }

  private createCartId(): Observable<string> {
    return observableFrom(this.afs.collection('shopping-carts').add({})).pipe(map(result => {
      localStorage.setItem('cartId', result.id);
      return result.id;
    }));
  }

  setItem(productKey: string, amount: number) {
    return this.currentCart$.pipe(switchMap(currentCart =>{
        let item = { product: this.products.getRef(productKey).ref, amount: amount };
        return currentCart.collection<CartItem>('items').doc(productKey).set(item);
      }
    )).toPromise();
  }
  removeItem(productKey: string): Promise<void> {
    return this.currentCart$.pipe(switchMap(currentCart =>
      currentCart.collection('items').doc(productKey).delete()
    )).toPromise();
  }
  getItem(productKey: string): Observable<CartItem> {
    return this.currentCart$.pipe(switchMap(currentCart =>
        currentCart.collection('items').doc<CartItem>(productKey).valueChanges()
    ));
  }
  getItems(): Observable<CartItem[]> {
    return this.currentCart$.pipe(switchMap(currentCart =>
      currentCart.collection<CartItem>('items').valueChanges()
    ));
  }  
}
