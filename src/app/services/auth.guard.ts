import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  signedIn: boolean = false;
  router: Router;
  constructor(router: Router) { this.router = router; }

  public SignIn(userName: string, password: string) {
    if(userName && password) {
      this.signedIn = true;
      this.router.navigate(["home"]);
    }  
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.signedIn?true:this.router.parseUrl('/');
  }
}
