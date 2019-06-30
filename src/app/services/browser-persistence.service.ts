import { Injectable } from '@angular/core';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';

@Injectable()
export class BrowserPersistenceService implements LocalPersistenceContext {

  constructor() { }

  write(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  read(key: string) {
    return localStorage.getItem(key);
  }

}