import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatGridListModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatSortModule } from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { DataService } from './services/data.service';
import { CordovaService } from './services/cordova.service';
import { BrowserPersistenceService } from './services/browser-persistence.service';
import { SyncService } from './services/sync.service';

const appRoutes: Routes = [  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatGridListModule, HttpClientModule,MatAutocompleteModule,ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatSortModule ],
  declarations: [ AppComponent, HomeComponent, LoginComponent, HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthGuard, DataService, CordovaService, BrowserPersistenceService, SyncService ]
})
export class AppModule { }
