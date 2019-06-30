import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity';
import { DeviceInfo } from '../interfaces/device-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SyncService {

  token: string;
  public info: DeviceInfo;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public authenticate(serial: string, callback) {
       this.http.post('https://roidata.azurewebsites.net/' + "jwt/AuthenticateDevice", '{ "Serial": "' + serial + '" }', { headers: new HttpHeaders().append("Content-Type", "application/json") }).subscribe((r: DeviceInfo)  => callback(this.info = r.Token?r:this.info), e => console.log(e));
  }

   public post(type: string, newData) {
     return new Promise((o, x) => {
       try {
     this.http.post('https://roidata.azurewebsites.net/' + type, newData, { headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.info.Token } }).subscribe(r => {}, e => x(), () => o() );
       } catch(ex) { console.log(ex); }
     });
   }

   public get(type: string) : Promise<Entity[]> {
      return new Promise((o, x) => {
        try {
          this.http.get('https://roidata.azurewebsites.net/' + type, { headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.info.Token } }).subscribe((r: any) => o(r.value), e => x(null) );
        } catch(ex) { console.log(ex); }
      });
   }
}