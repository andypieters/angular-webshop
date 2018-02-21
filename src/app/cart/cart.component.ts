import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { DocPipe } from './../doc.pipe';
import { ProductService } from './../services/product.service';
import { CartItem, ShoppingCartService } from '../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(public product: ProductService, private cart: ShoppingCartService) {
    this.items$ = cart.getItems();

    this.cartTotal$ = this.items$.switchMap(items => {
      return Observable.from(items).mergeMap(line => {
        return this.product.fromRef(line.product).take(1).map(product => product.price * line.amount);
      }).reduce((acc, x) => acc + x, 0);
    });
  }

  ngOnInit() {
  }

  trackByFn(index, item: CartItem) {
    return item.product != null ? item.product.id : null;
  }
  updateItem(product: firebase.firestore.DocumentReference, amount: number) {
    if (amount < 0) amount = 0;
    this.cart.setItem(product.id, +amount);
  }
  delete(product: firebase.firestore.DocumentReference) {
    this.cart.removeItem(product.id);
  }
}
