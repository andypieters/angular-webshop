import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Category } from './../../models/category';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminProductFormComponent implements OnInit {
  key: string;
  product: Product = <Product>{};

  categories$: Observable<Category[]>;
  constructor(
    private productService: ProductService,
    private router: Router,
    categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.categories$;
    
  }

  ngOnInit() {
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.key = key;
      this.productService.get(key).take(1).subscribe(product => this.product = product);
    }
  }

  save(form: NgForm) {
    if(this.key){
      this.productService.update(this.key, form.value)
    } else {
      this.productService.add(form.value);
    }
    this.router.navigate(['admin/products']);
  }
  remove(){
    this.productService.remove(this.key);
    this.router.navigate(['admin/products']);
  }
}
