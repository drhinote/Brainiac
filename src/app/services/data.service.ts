import { Injectable } from '@angular/core';
import { CordovaService } from './cordova.service';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';
import { BrowserPersistenceService } from './browser-persistence.service';
import { Entity } from '../interfaces/entity';
import { EntitySet } from '../interfaces/entity-set';
import { SyncService } from './sync.service';
import { DeviceInfo } from '../interfaces/device-info';

@Injectable()
export class DataService {
  persistence: LocalPersistenceContext;
  public Testers: EntitySet;
  public Subjects: EntitySet;
  public Tests: EntitySet;
  sync: SyncService;
  constructor(cordova: CordovaService, sync: SyncService) {
    if(cordova.isInBrowser()) {
      this.persistence = new BrowserPersistenceService();
      this.persistence.write("serial", "test-1");
    } else {
    
    }
    this.Testers = new EntitySet("Testers", this.persistence);
    this.Subjects = new EntitySet("Subjects", this.persistence);
    this.Tests = new EntitySet("Tests", this.persistence);
    this.sync = sync;
    this.synchronizeAllData();
  }

  async syncSet(name: string, sync: SyncService, extraAction: Function) {
    let updates = this[name].getUpdates();
    for(var i =0; i < updates.length; i++) {
      await sync.post(name, this[name].find(updates[i]));
      if(extraAction) extraAction(i);
    }
    let newitems = await sync.get(name);
    console.log(newitems);
    this[name].clear();
    this[name].items = newitems;
    for(var j =0; j < this[name].items.length; j++) {
            this[name].idx[j] = this[name].items[j].Id;
    }
    this[name].save();
  }

  public synchronizeAllData() {
    let serial = this.persistence.read("serial"); 
    if(!serial) {
      // ask for handset to be plugged in
    }
   
      this.sync.authenticate(serial, info => {
        try {
         
          this.persistence.write("description", JSON.stringify(info));
          this.syncSet("Testers", this.sync, null);
          this.syncSet("Subjects", this.sync, null);
          this.syncSet("Tests", this.sync, t => {
            var data = this.getTestBinary(t);
            // upload test data to server if it's not == null
          });
        } catch(e) {
           console.log(e);
        }
    });
  }

  public storeTest(testData: any) {

  }

  public getTestBinary(testData: any) : string[] {
    return null;
  }

}