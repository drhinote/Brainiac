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
  public testers: EntitySet;
  public subjects: EntitySet;
  public tests: EntitySet;
  sync: SyncService;
  constructor(cordova: CordovaService, sync: SyncService) {
    if(cordova.isInBrowser()) {
      this.persistence = new BrowserPersistenceService();
      this.persistence.write("serial", "test-1");
    }
    this.testers = new EntitySet("testers", this.persistence);
    this.subjects = new EntitySet("subjects", this.persistence);
    this.tests = new EntitySet("tests", this.persistence);
    this.sync = sync;
    this.synchronizeAllData();
  }

  async syncSet(name: string, sync: SyncService, extraAction: Function) {
   for(var i in this[name].getUpdates()) {
      await sync.post(name, i);
      if(extraAction) extraAction(i);
    }
    let newitems = await sync.get(name);
    this[name].clear();
    for(var i in newitems) {
      this[name].addOrUpdate(i);
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
          this.syncSet("testers", this.sync, null);
          this.syncSet("subjects", this.sync, null);
          this.syncSet("tests", this.sync, t => {
            var data = this.getTestBinary(t);
            // upload test data to server if it's not == null
          });
        } catch(e) {
          
        }
    });
  }

  public storeTest(testData: any) {

  }

  public getTestBinary(testData: any) : string[] {
    return null;
  }

}