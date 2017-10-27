import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

export interface CartItem{
  productKey: string;
  amount: number;
  product$: Observable<Product>;
}
@Injectable()
export class ShoppingCartService {
  cartId: string;

  get cart$():Observable<CartItem[]> {
    return Observable.fromPromise(this.getCartId()).switchMap(cartId => {
      return this.db.list('shopping-carts/' + cartId).valueChanges().map((cart:CartItem[]) => {
        return cart.map(item => {
          item.product$ = this.db.object('products/'+item.productKey).valueChanges();
          return item;
        });
      });
    });
  }

  constructor(private db: AngularFireDatabase) {
    this.getCartId();
  }

  private getCartId(): Promise<string> {
    return new Promise(resolve => {
      if (localStorage.getItem('cartId')) {
        this.cartId = localStorage.getItem('cartId');
        resolve(this.cartId);
        return;
      }

      this.db.list('shopping-carts').push({}).then(result => {
        localStorage.setItem('cartId', result.key);
        this.cartId = result.key;
        resolve(this.cartId);
      });
    });
  }

  setItem(productKey: string, amount: number) {
    return this.db.object('shopping-carts/' + this.cartId + '/' + productKey).set({ productKey: productKey, amount: amount });
  }
  removeItem(productKey: string) {
    return this.db.object('shopping-carts/' + this.cartId + '/' + productKey).remove();
  }
  getItem(productKey: string) {
    return this.db.object('shopping-carts/' + this.cartId + '/' + productKey).valueChanges();
  }
}
