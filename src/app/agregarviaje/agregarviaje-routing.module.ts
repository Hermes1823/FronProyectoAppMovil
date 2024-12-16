import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarviajePage } from './agregarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarviajePageRoutingModule {}
