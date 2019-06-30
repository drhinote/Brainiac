import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity';
import { DeviceInfo } from '../interfaces/device-info'
@Injectable()
export class SyncService {

  baseUrl: string = 'https://redoakdata.azurewebsites.net/';
  
  constructor() {
  
  }

  public authenticate(serial: string) : DeviceInfo {
    return null;
  }

   public post(type: string, newData) {

   }

   public get(type: string) : Entity[] {
     return null;
   }
}