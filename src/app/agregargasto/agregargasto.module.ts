import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregargastoPageRoutingModule } from './agregargasto-routing.module';

import { AgregargastoPage } from './agregargasto.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgregargastoPageRoutingModule
  ],
  declarations: [AgregargastoPage]
})
export class AgregargastoPageModule {}
