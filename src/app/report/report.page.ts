import { Component, OnInit } from '@angular/core';
import { Report, ReportService } from '../services/report.service';
import { ModalController } from '@ionic/angular';
import { ReportModalPage } from '../report-modal/report-modal.page';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  reports: Report[] = []

  constructor(private reportService: ReportService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadReports
  }

  loadReports() {
    this.reportService.getReports().subscribe(reports => {
      this.reports = this.reports
    })
  }

  async openModal(action: string, report?: Report) {
      const modal = await this.modalController.create({
        component: ReportModalPage,
        componentProps: {
          action: action,
          report: report || {}
        }
      })
  
      modal.onDidDismiss().then(() =>
        this.loadReports()
      )
  
      return await modal.present()
    }
  
    deleteReport(id: number) {
      this.reportService.deleteReport(id).subscribe(() => {
        this.loadReports()
      })
    }
  
    downloadPdf(id: number) {
      this.reportService.downloadPdf(id).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `report_${id}.pdf`
        link.click()
      })
    }
}
