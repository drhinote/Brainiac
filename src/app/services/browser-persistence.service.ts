import { Injectable } from '@angular/core';
import { LocalPersistenceContext } from '../interfaces/local-persistence-context';

@Injectable()
export class BrowserPersistenceService implements LocalPersistenceContext {

  constructor() { }

  public write(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public read(key: string) {
    return localStorage.getItem(key);
  }

}