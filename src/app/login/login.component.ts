import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  loginGoogle(){
    let redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.loginGoogle().then((result) => {
      this.router.navigateByUrl(redirectUrl)
    });
  }
  loginFacebook(){
    let redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.loginFacebook().then((result) => {
      this.router.navigateByUrl(redirectUrl)
    });
  }
}
