import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtRoutingModule } from './jwt-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    JwtRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JwtModule { }
