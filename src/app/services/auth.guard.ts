import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as sha512 from 'js-sha512';

@Injectable()
export class AuthGuard implements CanActivate {
  signedIn: any = null;
  router: Router;


  constructor(router: Router) { this.router = router; }

  public SignIn(user: any, password: string) {
    if (user && this.hashPassword(password, user.Id) == user.Password) {
      this.signedIn = user;
      this.router.navigate(["home"]);
    }
  }

  hashPassword(pw: string, id: string): string {
    var noSlashes = id.replace("-", "");
    var idb1 = [];
    for (var i = 0; i < noSlashes.length; i += 2) {
      idb1.push(parseInt("0x" + noSlashes.substr(i, 2)));
    }
    var rev = [];
    rev[0] = idb1[3];
    rev[1] = idb1[2];
    rev[2] = idb1[1];
    rev[3] = idb1[0];
    rev[4] = idb1[5];
    rev[5] = idb1[4];
    rev[6] = idb1[7];
    rev[7] = idb1[6];
    rev[8] = idb1[15];
    rev[9] = idb1[14];
    rev[10] = idb1[13];
    rev[11] = idb1[12];
    rev[12] = idb1[11];
    rev[13] = idb1[10];
    rev[14] = idb1[9];
    rev[15] = idb1[8];
    for(var j = 0; j < rev.length; j++) {
      pw = pw.concat(String.fromCharCode(rev[j]));
    }
    return '#' + this.hexToBase64(sha512.sha512(pw));
  }

  hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(" ");
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.signedIn ? true : this.router.parseUrl('/');
  }
}
