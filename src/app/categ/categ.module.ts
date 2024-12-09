import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategPageRoutingModule } from './categ-routing.module';

import { CategPage } from './categ.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategPageRoutingModule
  ],
  declarations: [CategPage]
})
export class CategPageModule {}
