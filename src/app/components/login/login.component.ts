import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import { DataService } from '../../services/data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Entity } from '../../interfaces/entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   auth: AuthGuard;
   data: DataService;
   form: FormControl;
   filteredOptions: Observable<Entity[]>;

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
      .pipe( startWith(''),
        map(value => typeof value === 'string' ? value : value.Name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  findUser(name: string) : Entity {
    return this.options.filter(o => o.Name.toLowerCase().indexOf(name.toLowerCase()) === 0).pop();
  }

  displayFn(user?: any): string | undefined {
    return user ? user.Name : undefined;
  }

  private _filter(name: string): Entity[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }
}