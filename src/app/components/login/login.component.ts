import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   auth: AuthGuard;
   data: DataService;
  options: any[];
  constructor(auth: AuthGuard, data: DataService)
  {
    this.auth = auth;
    this.data = data;
  }

  ngOnInit() {
    this.options = this.data.testers.getAll();
  }
}