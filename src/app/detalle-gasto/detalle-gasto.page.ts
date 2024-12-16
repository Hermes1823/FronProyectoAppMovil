import { Component, OnInit } from '@angular/core';
import { DetalleGasto, DetalleGastoService } from '../services/detalle-gasto.service';
import { ModalController } from '@ionic/angular';
import { DetalleGastoModalPage } from '../detalle-gasto-modal/detalle-gasto-modal.page';

@Component({
  selector: 'app-detalle-gasto',
  templateUrl: './detalle-gasto.page.html',
  styleUrls: ['./detalle-gasto.page.scss'],
})
export class DetalleGastoPage implements OnInit {
  detallegastos: DetalleGasto[] = []

  constructor(private detalleGastoService: DetalleGastoService, private modalController: ModalController) { }

  ngOnInit() {
    this.load()
  }

  load() {
    this.detalleGastoService.getDetalleGastos().subscribe(detallegastos => {
      this.detallegastos = detallegastos
    })
  }

  async openModal(action: string, detallegasto?: DetalleGasto) {
    const modal = await this.modalController.create({
      component: DetalleGastoModalPage,
      componentProps: {
        action: action,
        detallegasto: detallegasto || {}
      }
    })

    modal.onDidDismiss().then(() =>
      this.load()
    )

    return await modal.present()
  }

  delete(id: number) {
    this.detalleGastoService.deleteDetalleGasto(id).subscribe(() => {
      this.load()
    })
  }

  downloadPdf(id: number) {
    this.detalleGastoService.downloadPdf(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `work_${id}.pdf`
      link.click()
    })
  }
}
