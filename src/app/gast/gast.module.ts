import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastPageRoutingModule } from './gast-routing.module';

import { GastPage } from './gast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastPageRoutingModule
  ],
  declarations: [GastPage]
})
export class GastPageModule {}
