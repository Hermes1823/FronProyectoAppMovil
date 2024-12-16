import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleGastoModalPage } from './detalle-gasto-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleGastoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleGastoModalPageRoutingModule {}
