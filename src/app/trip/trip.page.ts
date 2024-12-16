import { Component, OnInit } from '@angular/core';
import { Trip, TripService } from '../services/trip.service';
import { ModalController } from '@ionic/angular';
import { TripModalPage } from '../trip-modal/trip-modal.page';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trips: Trip[] = []
  
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mes',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Trabajos',
        },
        beginAtZero: true,
      },
    },
  };

  constructor(private tripService: TripService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadTrips()

    this.tripService.getChartData().subscribe((response: any) => {
      this.chartData = response.chartData.map((item: any) => ({
        name: item.month,
        value: item.total,
      }));
      this.chartLabels = response.chartData.map((item: any) => item.month);
    });

  }

  loadTrips() {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips
    })
  }

  async openModal(action: string, trip?: Trip) {
    const modal = await this.modalController.create({
      component: TripModalPage,
      componentProps: {
        action: action,
        trip: trip || {}
      }
    })

    modal.onDidDismiss().then(() =>
      this.loadTrips()
    )

    return await modal.present()
  }

  deleteTrip(id: number) {
    this.tripService.deleteTrip(id).subscribe(() => {
      this.loadTrips()
    })
  }

  downloadPdf(id: number) {
    this.tripService.downloadPdf(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `trip_${id}.pdf`
      link.click()
    })
  }
}
