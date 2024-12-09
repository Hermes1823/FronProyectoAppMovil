import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RucPageRoutingModule } from './ruc-routing.module';

import { RucPage } from './ruc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RucPageRoutingModule
  ],
  declarations: [RucPage]
})
export class RucPageModule {}
