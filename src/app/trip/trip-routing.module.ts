import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripPage } from './trip.page';

const routes: Routes = [
  {
    path: '',
    component: TripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class TripPageRoutingModule {}
