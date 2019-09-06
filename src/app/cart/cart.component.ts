import {from as observableFrom,  Observable } from 'rxjs';

import {map, take, switchMap, mergeMap, reduce} from 'rxjs/operators';
import { DocPipe } from './../doc.pipe';
import { ProductService } from './../services/product.service';
import { CartItem, ShoppingCartService } from '../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import {DocumentReference} from '@angular/fire/firestore';

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

    this.cartTotal$ = this.items$.pipe(switchMap(items => {
      return observableFrom(items).pipe(mergeMap(line => {
        return this.product.fromRef(line.product).pipe(take(1),map(product => product.price * line.amount),);
      }),reduce((acc, x) => acc + x, 0),);
    }));
  }

  ngOnInit() {
  }

  trackByFn(index, item: CartItem) {
    return item.product != null ? item.product.id : null;
  }
  updateItem(product: DocumentReference, amount: number) {
    if (amount < 0) amount = 0;
    this.cart.setItem(product.id, +amount);
  }
  delete(product: DocumentReference) {
    this.cart.removeItem(product.id);
  }
}
