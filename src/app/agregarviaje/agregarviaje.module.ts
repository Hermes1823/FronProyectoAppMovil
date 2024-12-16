import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarviajePageRoutingModule } from './agregarviaje-routing.module';

import { AgregarviajePage } from './agregarviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarviajePageRoutingModule
  ],
  declarations: [AgregarviajePage]
})
export class AgregarviajePageModule {}
