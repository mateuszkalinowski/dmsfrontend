import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from './register/register.component';
import {AppEntranceGuardService} from './app-entrance-guard.service';

const routes: Routes = [
  { path: '', component: LogInComponent, canActivate: [AppEntranceGuardService] },
  { path: 'login', component: LogInComponent},
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
