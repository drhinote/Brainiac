import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import { DataService } from '../../services/data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   auth: AuthGuard;
   data: DataService;
   form: FormControl;
    filteredOptions: Observable<string[]>;

  public options: any[];
  constructor(auth: AuthGuard, data: DataService)
  {
    this.auth = auth;
    this.data = data;
  }

  ngOnInit() {
    this.form = new FormControl();
    this.options = this.data.Testers.getAll();
     this.filteredOptions = this.form.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(o => o.Name.toLowerCase().includes(filterValue));
  }
}