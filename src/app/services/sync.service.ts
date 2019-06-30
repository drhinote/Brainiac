import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity';
import { DeviceInfo } from '../interfaces/device-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SyncService {

  baseUrl: string = 'https://roidata.azurewebsites.net/';
  token: string;
  public info: DeviceInfo;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public authenticate(serial: string, callback) {
       this.http.post(this.baseUrl + "jwt/AuthenticateDevice", '{ "Serial": "' + serial + '" }', { headers: new HttpHeaders().append("Content-Type", "application/json") }).subscribe((r: DeviceInfo)  => callback(this.info = r.Token?r:this.info), e => console.log(e));
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