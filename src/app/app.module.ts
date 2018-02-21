import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrdersComponent } from './orders/orders.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminProductFormComponent } from './admin/admin-add-product/admin-add-product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DocPipe } from './doc.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    CartComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    OrdersComponent,
    AccessDeniedComponent,
    AdminProductFormComponent,
    ProductCardComponent,
    DocPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/products/add', 
        component: AdminProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/products/:key', 
        component: AdminProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },

      { path: 'access-denied', component: AccessDeniedComponent },      
    ])
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    AdminAuthGuard, 
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    DocPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
