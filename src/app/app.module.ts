import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from'./material.module';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { DataService } from './services/data.service';
import { CordovaService } from './services/cordova.service';
import { HandsetService } from './services/handset.service';
import { BrowserPersistenceService } from './services/browser-persistence.service';
import { SyncService } from './services/sync.service';

const appRoutes: Routes = [  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, MaterialModule, CommonModule ],
  declarations: [ AppComponent, HomeComponent, LoginComponent, HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthGuard, DataService, CordovaService, BrowserPersistenceService, SyncService, HandsetService ]
})
export class AppModule { }
