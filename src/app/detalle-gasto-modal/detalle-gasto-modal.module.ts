import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleGastoModalPageRoutingModule } from './detalle-gasto-modal-routing.module';

import { DetalleGastoModalPage } from './detalle-gasto-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleGastoModalPageRoutingModule
  ],
  declarations: [DetalleGastoModalPage]
})
export class DetalleGastoModalPageModule {}
