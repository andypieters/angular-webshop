import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products$: Observable<Product[]>

  constructor(private productService: ProductService) {
    this.products$ = productService.getAll();
  }

}
