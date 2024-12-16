import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripModalPage } from './trip-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TripModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripModalPageRoutingModule {}
