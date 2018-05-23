
import {map} from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map((user) => {
      if(user) return true;
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    }));
  }
}
