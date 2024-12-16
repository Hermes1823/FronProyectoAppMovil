import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkModalPageRoutingModule } from './work-modal-routing.module';

import { WorkModalPage } from './work-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkModalPageRoutingModule
  ],
  declarations: [WorkModalPage]
})
export class WorkModalPageModule {}
