import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserUpdteComponent} from "./user-updte/user-updte.component";
import * as path from "path";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
