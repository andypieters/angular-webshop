import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.map((user) => {
      if(user && user.isAdmin) return true;
      this.router.navigate(['access-denied']);;
    });
  }
}
