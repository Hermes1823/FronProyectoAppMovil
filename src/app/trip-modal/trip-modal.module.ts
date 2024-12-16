import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripModalPageRoutingModule } from './trip-modal-routing.module';

import { TripModalPage } from './trip-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripModalPageRoutingModule
  ],
  declarations: [TripModalPage]
})
export class TripModalPageModule {}
