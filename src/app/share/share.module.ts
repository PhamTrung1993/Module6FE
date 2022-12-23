import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './nav-bar/search/search.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    SearchComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        ShareRoutingModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class ShareModule { }
