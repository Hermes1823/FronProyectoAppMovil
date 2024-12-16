import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ViajesService } from '../services/viajes.service'; // Asegúrate de que el servicio esté creado
import { ViajeModel } from '../models/viaje.model'; // Asegúrate de que el modelo esté creado
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarviaje',
  templateUrl: './agregarviaje.page.html', // Asegúrate de que esta plantilla sea la correcta
  styleUrls: ['./agregarviaje.page.scss'],
})
export class AgregarviajePage implements OnInit {

  edit = false;

  @Input() viaje: ViajeModel | undefined;
  datos = {
    Destino: '',
  };

  createFormGroup() {
    return new FormGroup({
      Destino: new FormControl('', [Validators.required]), // Solo un campo "destino"
    });
  }

  validation_messages = {
    Destino: [{ type: 'required', message: 'Escriba el destino.' }],
  };

  registrarForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private serviceviaje: ViajesService, // Asegúrate de tener este servicio para manejar viajes
    public formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.registrarForm = this.createFormGroup();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  tempidViaje: number | undefined;

  ngOnInit() {
    console.log('Viaje recibido en AgregarViajePage:', this.viaje);

    if (this.viaje) {
      console.log('Claves del viaje:', Object.keys(this.viaje));
      console.log('ID del viaje:', this.viaje.IdViaje);
    } else {
      console.error('No se recibió ningún viaje.');
    }

    this.tempidViaje = this.viaje?.IdViaje;

    if (this.edit && this.viaje) {
      this.registrarForm.setValue({
        Destino: this.viaje.Destino,
      });

      console.log('ID del viaje:', this.viaje.IdViaje);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.edit) {
      const viajeActualizado: ViajeModel = {
        ...this.registrarForm.value,
        IdViaje: this.viaje?.IdViaje,
      };

      if (this.viaje?.IdViaje !== undefined) {
        this.serviceviaje
          .Editar(viajeActualizado, this.viaje.IdViaje)
          .subscribe(
            (response) => {
              this.modalCtrl.dismiss(response, 'actualizado');
              console.log('Viaje actualizado:', response);
              window.location.reload();
            },
            (error) => {
              console.error('Error al actualizar el viaje:', error);
            }
          );
      } else {
        console.error('El ID del viaje es undefined', this.tempidViaje);
      }
    } else {
      const viaje: ViajeModel = this.registrarForm.value;
      this.serviceviaje.Agregar(viaje).subscribe(
        (response) => {
          this.modalCtrl.dismiss(response, 'creado');
          console.log('Viaje creado:', response);
          this.presentToast('Viaje creado con éxito.');
        },
        (error) => {
          console.error('Error al crear el viaje:', error);
        }
      );
    }
  }
}

