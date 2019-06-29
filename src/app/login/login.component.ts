import { Component } from '@angular/core';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
   auth: AuthGuard;

  constructor(auth: AuthGuard)
  {
    this.auth = auth;
  }
}