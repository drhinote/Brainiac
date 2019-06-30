import { Injectable } from '@angular/core';
import { LocalPersistenceContext } from './local-persistence-context';

@Injectable()
export class LocalStoragePersistenceService implements LocalPersistenceContext {

  constructor() { }

  write(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  read(key: string) {
    return localStorage.getItem(key);
  }

}