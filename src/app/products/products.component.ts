import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(products: ProductService) {
    this.products$ = products.getAll();
  }

  trackByFn(product: any){
    return product != null ? product.key: null;
  }
  ngOnInit() {
  }

}
