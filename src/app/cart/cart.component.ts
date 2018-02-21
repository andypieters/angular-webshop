import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { DocPipe } from './../doc.pipe';
import { ProductService } from './../services/product.service';
import { CartItem, ShoppingCartService } from '../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/reduce';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;

  constructor(public product: ProductService, private cart: ShoppingCartService) {
    this.items$ = cart.getItems();
  }

  public get cartTotal$(): Observable<number> {
    // todo totaal bepalen adhv items
    return Observable.of(5);  
  }

  ngOnInit() {
  }

  trackByFn(item: CartItem) {
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
