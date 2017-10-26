import { AppUser } from './../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private routeSub: Subscription;

  isCollapsed = true;
  user: AppUser;

  constructor(private auth: AuthService, private router: Router) { 
    auth.user$.subscribe(user => {
      this.user = user
    });
  }

  logout(){
    this.auth.logout().then(() => this.router.navigate(['']));
  }
  
}
