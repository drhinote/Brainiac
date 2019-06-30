import { Injectable, OnInit } from '@angular/core';
import { CordovaService } from './cordova.service';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';
import { LocalStoragePersistenceService } from './local-storage-persistence.service';
import { Entity } from '../interfaces/entity';
import { EntitySet } from '../interfaces/entity-set';
import { SyncService } from './sync.service';

@Injectable()
export class DataService implements OnInit {
  persistence: LocalPersistenceContext;
  public testers: EntitySet;
  public subjects: EntitySet;
  public tests: EntitySet;
  sync: SyncService;

  constructor(cordova: CordovaService, sync: SyncService) {
    this.persistence = cordova.isInBrowser()?new LocalStoragePersistenceService():null; 
    this.testers = new EntitySet("testers");
    this.subjects = new EntitySet("subjects");
    this.tests = new EntitySet("tests");
    this.sync = sync;
  }

  ngOnInit() {
    this.synchronizeAllData();
  }

  public synchronizeAllData() {
    //Get token if possible, ask to plug in handset it it's not
  }

  public storeTest(testData: any) {

  }

  public getTestBinary(testData: any) : string[] {
    return null;
  }

}