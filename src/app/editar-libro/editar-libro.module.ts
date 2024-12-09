import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarLibroPageRoutingModule } from './editar-libro-routing.module';

import { EditarLibroPage } from './editar-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarLibroPageRoutingModule
  ],
  declarations: [EditarLibroPage]
})
export class EditarLibroPageModule {}
