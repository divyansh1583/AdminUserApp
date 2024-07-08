import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSortModule} from '@angular/material/sort';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatSortModule
  ]
})
export class UserModule { }
