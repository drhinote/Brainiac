import { Injectable } from '@angular/core';
import { FakeSerialService } from './fake-serial.service';

@Injectable()
export class CordovaService {

  browser: boolean;
  public native: any;

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
    this.native = getWindow().cordova;
    this.browser = !(this.native);
    if(this.browser) {
      this.native = {
        serial: new FakeSerialService()
      };
    }
  }

}