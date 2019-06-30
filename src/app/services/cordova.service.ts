import { Injectable } from '@angular/core';



@Injectable()
export class CordovaService {

  browser: boolean;

  public isOnDevice(): boolean {
    return !this.browser;
  }


  public isInBrowser(): boolean {
    return this.browser;
  }

  constructor() {
    let getWindow = () : any => {
      return window;
    };
    this.browser = !!(getWindow().cordova);
  }

}