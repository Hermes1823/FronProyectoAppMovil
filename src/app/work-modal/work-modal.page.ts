import { Component, Input, OnInit } from '@angular/core';
import { Work, WorkService } from '../services/work.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-work-modal',
  templateUrl: './work-modal.page.html',
  styleUrls: ['./work-modal.page.scss'],
})
export class WorkModalPage {
  @Input() action: string | undefined
  @Input() work: Work = {id: 0, name: '', location: '', start_date: new Date(), end_date: new Date(), reports: []}

  constructor(private modalController: ModalController, private workService: WorkService) {}

  saveWork() {
    if (this.action === 'create') {
      this.workService.createWork(this.work).subscribe(() => {
        this.modalController.dismiss()
      })
    } else if (this.action === 'edit') {
      this.workService.updateWork(this.work.id, this.work).subscribe(() => {
        this.modalController.dismiss()
      })
    }
  }

  close () {
    this.modalController.dismiss()
  }
}
