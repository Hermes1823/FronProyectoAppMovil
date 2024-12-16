import { Component, Input, OnInit } from '@angular/core';
import { Trip, TripService } from '../services/trip.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.page.html',
  styleUrls: ['./trip-modal.page.scss'],
})
export class TripModalPage {
  @Input() action: string | undefined
  @Input() trip: Trip = {id: 0, destination: '', start_date: new Date(), end_date: new Date(), description: '', reports: []}

  constructor(private modalController: ModalController, private tripService: TripService) {}

  saveTrip() {
    if (this.action === 'create') {
      this.tripService.createTrip(this.trip).subscribe(() => {
        this.modalController.dismiss()
      })
    } else if (this.action === 'edit') {
      this.tripService.updateTrip(this.trip.id, this.trip).subscribe(() => {
        this.modalController.dismiss()
      })
    }
  }

  close () {
    this.modalController.dismiss()
  }
}
