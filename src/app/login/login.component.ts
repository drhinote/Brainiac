import { Component } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
   auth: AuthGuard;
   data: DataService;

  constructor(auth: AuthGuard, data: DataService)
  {
    this.auth = auth;
    this.data = data;
  }
}