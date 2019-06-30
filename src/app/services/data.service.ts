import { Injectable, OnInit } from '@angular/core';
import { CordovaService } from './cordova.service';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';
import { BrowserPersistenceService } from './browser-persistence.service';
import { Entity } from '../interfaces/entity';
import { EntitySet } from '../interfaces/entity-set';
import { SyncService } from './sync.service';
import { DeviceInfo } from '../interfaces/device-info';

@Injectable()
export class DataService implements OnInit {
  persistence: LocalPersistenceContext;
  public testers: EntitySet;
  public subjects: EntitySet;
  public tests: EntitySet;
  sync: SyncService;
  constructor(cordova: CordovaService, sync: SyncService) {
    this.persistence = cordova.isInBrowser()?new BrowserPersistenceService():null; 
    this.testers = new EntitySet("testers", this.persistence);
    this.subjects = new EntitySet("subjects", this.persistence);
    this.tests = new EntitySet("tests", this.persistence);
    this.sync = sync;
  }

  ngOnInit() {
    this.synchronizeAllData();
  }

  syncSet(name: string, sync: SyncService, extraAction: Function) {
   for(var i in this[name].getUpdates()) {
      sync.post(name, i);
      if(extraAction) extraAction(i);
    }
    this[name].clear();
    for(var i in sync.get(name)) {
      this[name].addOrUpdate(i);
    }
    this[name].save();
  }

  public synchronizeAllData() {
    try {
      this.sync.authenticate(this.persistence.read("serial"), info => {
      this.persistence.write("description", JSON.stringify(info));
      this.syncSet("testers", this.sync, null);
      this.syncSet("subjects", this.sync, null);
      this.syncSet("tests", this.sync, t => {
        var data = this.getTestBinary(t);
        // upload test data to server if it's not == null
      });
    });
    } catch(e) {
      // iono
    }
  }

  public storeTest(testData: any) {

  }

  public getTestBinary(testData: any) : string[] {
    return null;
  }

}