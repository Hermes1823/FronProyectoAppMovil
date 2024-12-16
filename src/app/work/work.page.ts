import { Component, OnInit } from '@angular/core';
import { Work, WorkService } from '../services/work.service';
import { ModalController } from '@ionic/angular';
import { WorkModalPage } from '../work-modal/work-modal.page';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  works: Work[] = []

  constructor(private workService: WorkService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadWorks()
  }

  loadWorks() {
    this.workService.getWorks().subscribe(works => {
      this.works = works
    })
  }

  async openModal(action: string, work?: Work) {
      const modal = await this.modalController.create({
        component: WorkModalPage,
        componentProps: {
          action: action,
          work: work || {}
        }
      })
  
      modal.onDidDismiss().then(() =>
        this.loadWorks()
      )
  
      return await modal.present()
    }
  
    deleteWork(id: number) {
      this.workService.deleteWork(id).subscribe(() => {
        this.loadWorks()
      })
    }
  
    downloadPdf(id: number) {
      this.workService.downloadPdf(id).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `work_${id}.pdf`
        link.click()
      })
    }
}
