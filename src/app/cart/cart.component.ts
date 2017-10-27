import { Observable } from 'rxjs/Observable';
import { CartItem, ShoppingCartService } from '../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]>;

  constructor(private cart: ShoppingCartService) { 
    this.cart$ = cart.cart$;
  }

  ngOnInit() {
  }

  trackByFn(item: any){
    return item != null ? item.productKey: null;
  }

  updateItem(productKey: string, amount: number){
    if(amount<0)amount=0;
    this.cart.setItem(productKey, +amount);
  }
}
