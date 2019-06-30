import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity';

@Injectable()
export class SyncService {

  baseUrl: string = 'https://redoakdata.azurewebsites.net/';
  
  constructor() {
  
  }

   public post(type: string, newData: Entity) {

   }

   public get(type: string) : Entity[] {
     return null;
   }
}