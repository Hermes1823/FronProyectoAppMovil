import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../services/viajes.service';
import { ViajeModel } from '../models/viaje.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarviajePage } from '../agregarviaje/agregarviaje.page';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  viajes: ViajeModel[] | undefined;

  constructor(private service: ViajesService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.obtenerViajes();
  }

  obtenerViajes() {
    this.service.ObtenerTodos().subscribe(response => {
      this.viajes = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarviajePage,
      cssClass: 'my-custom-class'  // Opcional: puedes agregar una clase CSS personalizada
    });

    modal.onDidDismiss().then((data) => {
      // Verifica si se ha creado un nuevo viaje
      if (data.data && data.data !== 'cerrado') {
        this.viajes?.push(data.data);  // Agrega el nuevo viaje a la lista
      }
    });

    return await modal.present();
  }

  loadViajes() {
    this.service.ObtenerTodos().subscribe(
      response => {
        this.viajes = response;
      },
      error => {
        console.error('Error al obtener viajes:', error);
      }
    );
  }

  async openEditModal(viaje: ViajeModel) {
    console.log('Abriendo modal para editar el viaje:', viaje);
    const modal = await this.modalCtrl.create({
      component: AgregarviajePage,
      componentProps: {
        viaje: viaje, // Asegúrate de que aquí estás pasando el viaje correcto
        edit: true // Establece la variable edit como true
      }
    });
  
    modal.onDidDismiss().then((result) => {
      // Maneja el resultado del modal aquí
    });
  
    return await modal.present();
  }

  // Método para abrir el modal en modo edición
  editViaje(viaje: ViajeModel) {
    this.openEditModal(viaje);
  }

  eliminarViaje(id: number) {
    this.service.Eliminar(id).subscribe(() => {
      this.obtenerViajes(); // Recargar la lista después de eliminar
    });
  }
}
