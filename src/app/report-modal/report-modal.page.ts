import { Component, Input, OnInit } from '@angular/core';
import { Report, ReportService } from '../services/report.service';
import { ModalController } from '@ionic/angular';
import { Work, WorkService } from '../services/work.service';
import { Trip, TripService } from '../services/trip.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.page.html',
  styleUrls: ['./report-modal.page.scss'],
})
export class ReportModalPage implements OnInit {
  @Input() action: string | undefined
  @Input() report: Report = {id: 0, title: '', content: '', trip_id: 0, trip: {id: 0, destination: '', start_date: new Date(), end_date: new Date(), description: '', reports: []}, work_id: 0, work: {id: 0, name: '', location: '', start_date: new Date(), end_date: new Date(), reports: []}}

  trips: Trip[] = []
  works: Work[] = []

  constructor(private modalController: ModalController, private reportService: ReportService, private tripService: TripService, private workService: WorkService) {}

  ngOnInit() {
    this.loadTrips()
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips
    })
  }

  loadWorks() {
    this.workService.getWorks().subscribe(works => {
      this.works = works
    })
  }

  saveReport() {
    if (this.action === 'create') {
      this.reportService.createReport(this.report).subscribe(() => {
        this.modalController.dismiss()
      })
    } else if (this.action === 'edit') {
      this.reportService.updateReport(this.report.id, this.report).subscribe(() => {
        this.modalController.dismiss()
      })
    }
  }

  close () {
    this.modalController.dismiss()
  }
}
