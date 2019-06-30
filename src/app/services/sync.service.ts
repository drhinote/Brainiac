import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity';
import { DeviceInfo } from '../interfaces/device-info';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SyncService {

  baseUrl: string = 'https://redoakdata.azurewebsites.net/';
  token: string;
  public info: DeviceInfo;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public authenticate(serial: string, callback) {
       this.http.post(this.baseUrl + "jwt/AuthenticateDevice", { Serial: serial }, { headers:  {"Content-Type": "application/json"} }).subscribe((r: DeviceInfo)  => this.info = r.Token?r:this.info, e => { /* iono */ }, () => callback(this.info));
  }

   public post(type: string, newData) {
     return new Promise((o, x) => {
     this.http.post(this.baseUrl + type, newData, { headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.info.Token } }).subscribe(r => {}, e => x(), () => o() );
     });
   }

   public get(type: string) : Promise<Entity[]> {
      return new Promise((o, x) => {
          this.http.get(this.baseUrl + type, { headers: {"Content-Type": "application/json", "Authorization": "Bearer " + this.info.Token } }).subscribe((r: any) => o(r.value), e => x(null) );
      });
   }
}