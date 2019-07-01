import { Injectable  } from '@angular/core';
import { Observable, Observer  } from '@angular/common';

@Injectable()
export class HandsetService {

  constructor() { }

   time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

}