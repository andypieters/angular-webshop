import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private routeSub: Subscription;
  itemsInCart: number = 0;

  isCollapsed = true;
  user: AppUser;

  constructor(private auth: AuthService, private router: Router, cart: ShoppingCartService) {
    auth.user$.subscribe(user => {
      this.user = user
    });
    cart.getItems().subscribe(items => {
      this.itemsInCart = items.reduce((sum, value) => sum + value.amount, 0);
    });
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['']));
  }

}
