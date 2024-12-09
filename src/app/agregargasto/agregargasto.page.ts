import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GastosService } from '../services/gastos.service';  // Asegúrate de tener este servicio para manejar gastos
import { GastoModel } from '../models/gasto.model'; // Asegúrate de tener este modelo
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregargasto',
  templateUrl: './agregargasto.page.html',
  styleUrls: ['./agregargasto.page.scss'],
})
export class AgregargastoPage implements OnInit {

  edit = false;

  @Input() gasto: GastoModel | undefined;
  datos = {
    titulo: '',
    monto: '',
    categoria: ''
  };

  // Crear el formulario de gasto
  createFormGroup() {
    return new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.min(0)]),
      categoria: new FormControl('', [Validators.required]),
    });
  }

  // Mensajes de validación
  validation_messages = {
    titulo: [{ type: 'required', message: 'Escriba el título.' }],
    monto: [
      { type: 'required', message: 'Escriba el monto.' },
      { type: 'min', message: 'El monto debe ser mayor a 0.' }
    ],
    categoria: [{ type: 'required', message: 'Escriba la categoría.' }]
  };

  registrarForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private serviceGasto: GastosService,  // Servicio para manejar los gastos
    public formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.registrarForm = this.createFormGroup();
  }

  // Mostrar un mensaje toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  tempidGasto: number | undefined;

  ngOnInit() {
    if (this.gasto) {
      // Si está en modo edición, inicializar el formulario
      this.edit = true;
      this.registrarForm.setValue({
        titulo: this.gasto.titulo,
        monto: this.gasto.monto,
        categoria: this.gasto.categoria
      });
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  // Método para enviar los datos al servicio
  onSubmit() {
    if (this.edit) {
      // Actualizar gasto
      const gastoActualizado: GastoModel = {
        ...this.registrarForm.value,
        idgasto: this.gasto?.idgasto,
      };

      if (this.gasto?.idgasto !== undefined) {
        this.serviceGasto
          .Editar(gastoActualizado, this.gasto.idgasto)  // Llamada para actualizar el gasto
          .subscribe(
            (response) => {
              this.modalCtrl.dismiss(response, 'actualizado');
              this.presentToast('Gasto actualizado con éxito.');
              console.log('Gasto actualizado:', response);
            },
            (error) => {
              console.error('Error al actualizar el gasto:', error);
            }
          );
      }
    } else {
      // Lógica para agregar nuevo gasto
      const nuevoGasto: GastoModel = this.registrarForm.value;
      this.serviceGasto.Agregar(nuevoGasto).subscribe(
        (response) => {
          this.modalCtrl.dismiss(response, 'creado');
          this.presentToast('Gasto creado con éxito.');
          console.log('Gasto creado:', response);
        },
        (error) => {
          console.error('Error al crear el gasto:', error);
        }
      );
    }
  }
}
