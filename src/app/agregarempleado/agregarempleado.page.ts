import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EmpleadoService } from '../services/empleado.service';
import { EmpleadoModel } from '../models/empleado.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarempleado',
  templateUrl: './agregarempleado.page.html',
  styleUrls: ['./agregarempleado.page.scss'],
})
export class AgregarempleadoPage implements OnInit {
  

  edit = false;

  @Input() empleado: EmpleadoModel | undefined;
  datos = {
    Nombre: '',
    Telefono: '',
    Cargo: '',
  };
  

  createFormGroup() {
    return new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Telefono: new FormControl('', [Validators.required]),
      Cargo: new FormControl('', [Validators.required]),
    });
  }

  validation_messages = {
    Nombre: [{ type: 'required', message: 'Escriba el Nombre.' }],
    Telefono: [{ type: 'required', message: 'Escriba el telefono' }],
    Cargo: [{ type: 'required', message: 'Escribe el cargo' }],
  };

  registrarForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private serviceempleado: EmpleadoService,
    public formBuilder: FormBuilder,
    private toastController: ToastController // Agrega este servicio

  ) {
    this.registrarForm = this.createFormGroup();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del toast en milisegundos
      position: 'top', // Posición del toast (top, bottom, middle)
      color: 'success', // Color del toast
    });
    await toast.present();
  }
 
  tempidEmpleado: number | undefined;

  

  ngOnInit() {

    console.log('Empleado recibido en AgregarEmpleadoPage:', this.empleado);

  if (this.empleado) {
    // Imprimir las claves del objeto
    console.log('Claves del empleado:', Object.keys(this.empleado));

    // Verificar el ID
    console.log('ID del empleado:', this.empleado.IdEmpleado); // Asegúrate de que este sea el nombre correcto
  } else {
    console.error('No se recibió ningún empleado.');
  }

  // Guardar el ID del cliente temporalmente para su uso posterior
  this.tempidEmpleado = this.empleado?.IdEmpleado;

  // Aquí puedes inicializar el formulario si estás en modo edición
  if (this.edit && this.empleado) {
    this.registrarForm.setValue({
      Nombre: this.empleado.Nombre,
      Telefono: this.empleado.Telefono,
      Cargo: this.empleado.Cargo,
    });

    console.log('ID del empleado:', this.empleado.IdEmpleado); // Verificar el ID del cliente
  }
}

cerrarModal() {
  this.modalCtrl.dismiss(null, 'cerrado');
}

onSubmit() {
  if (this.edit) {
      const empleadoActualizado: EmpleadoModel = {
          ...this.registrarForm.value,
          IdEmpleado: this.empleado?.IdEmpleado, // Debería ser un número válido aquí
      };

      if (this.empleado?.IdEmpleado !== undefined) {
          this.serviceempleado
              .Editar(empleadoActualizado, this.empleado.IdEmpleado)
              .subscribe(
                  (response) => {
                      this.modalCtrl.dismiss(response, 'actualizado');
                      console.log('Empleado actualizado:', response);
                      window.location.reload();
                  },
                  (error) => {
                      console.error('Error al actualizar el empleado:', error);
                  }
              );
      } else {
          console.error('El ID del empleado es undefined', this.tempidEmpleado);
      }
  } else {
      // Lógica para agregar nuevo cliente
      const empleado: EmpleadoModel = this.registrarForm.value;
      this.serviceempleado.Agregar(empleado).subscribe(
          (response) => {
              this.modalCtrl.dismiss(response, 'creado');
              console.log('Empleado creado:', response);
              this.presentToast('Empleado creado con éxito.'); // Mostrar el toast
          },
          (error) => {
              console.error('Error al crear el empleado:', error);
          }
      );
  }
}


}
