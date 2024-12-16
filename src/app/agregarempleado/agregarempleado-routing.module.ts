import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarempleadoPage } from './agregarempleado.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarempleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarempleadoPageRoutingModule {}
