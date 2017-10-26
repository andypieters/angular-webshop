import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from "angular-4-data-table-bootstrap-4";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private itemResource: DataTableResource<Product>;

  products: Product[];
  count: number;

  constructor(private service: ProductService) {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(products => this.products = products);
  }

  ngOnInit() {
    this.subscription = this.service.getAll().subscribe(products => {
      this.itemResource = new DataTableResource(products);
      this.itemResource.count().then(count => this.count = count);
      this.reloadItems({offset:0, limit:10});
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
