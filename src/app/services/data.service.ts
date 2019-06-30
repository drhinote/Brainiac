import { Injectable, OnInit } from '@angular/core';
import { CordovaService } from './cordova.service';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';
import { BrowserPersistenceService } from './browser-persistence.service';
import { Entity } from '../interfaces/entity';
import { EntitySet } from '../interfaces/entity-set';
import { SyncService } from './sync.service';

@Injectable()
export class DataService implements OnInit {
  persistence: LocalPersistenceContext;
  public testers: EntitySet;
  public subjects: EntitySet;
  public tests: EntitySet;
  
  constructor(cordova: CordovaService) {
    this.persistence = cordova.isInBrowser()?new BrowserPersistenceService():null; 
    this.testers = new EntitySet("testers");
    this.subjects = new EntitySet("subjects");
    this.tests = new EntitySet("tests");
  }

  ngOnInit() {
    this.synchronizeAllData();
  }

  public synchronizeAllData() {
    var sync: SyncService = new SyncService();
    for(var i in this.testers.getNew()) {
      sync.post("testers", i);
    }
    this.testers.clear();
    for(var i in sync.get("testers")) {
      
    }
    for(var i in this.subjects.getNew()) {
      sync.post("subjects", i);
    }

    for(var i in this.tests.getNew()) {
      sync.post("tests", i);
    }
  }

  public storeTest(testData: any) {

  }

  public getTestBinary(testData: any) : string[] {
    return null;
  }

}