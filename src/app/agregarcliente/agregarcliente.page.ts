import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { ClienteModel } from '../models/cliente.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.page.html',
  styleUrls: ['./agregarcliente.page.scss'],
})
export class AgregarclientePage implements OnInit {
  

  edit = false;

  @Input() cliente: ClienteModel | undefined;
  datos = {
    dni: '',
    nombres: '',
    email: '',
    direccion: '',
  };
  

  createFormGroup() {
    return new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }

  validation_messages = {
    dni: [{ type: 'required', message: 'Escriba DNI.' }],
    nombres: [{ type: 'required', message: 'Escriba el nombre' }],
    email: [{ type: 'required', message: 'Escribe el email' }],
    direccion: [{ type: 'required', message: 'Escriba la direccion' }],
  };

  registrarForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private servicecliente: ClientesService,
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
 
  tempidCliente: number | undefined;

  

  ngOnInit() {

    console.log('Cliente recibido en AgregarClientePage:', this.cliente);

  if (this.cliente) {
    // Imprimir las claves del objeto
    console.log('Claves del cliente:', Object.keys(this.cliente));

    // Verificar el ID
    console.log('ID del cliente:', this.cliente.idcliente); // Asegúrate de que este sea el nombre correcto
  } else {
    console.error('No se recibió ningún cliente.');
  }

  // Guardar el ID del cliente temporalmente para su uso posterior
  this.tempidCliente = this.cliente?.idcliente;

  // Aquí puedes inicializar el formulario si estás en modo edición
  if (this.edit && this.cliente) {
    this.registrarForm.setValue({
      dni: this.cliente.dni,
      nombres: this.cliente.nombres,
      email: this.cliente.email,
      direccion: this.cliente.direccion,
    });

    console.log('ID del cliente:', this.cliente.idcliente); // Verificar el ID del cliente
  }
}

cerrarModal() {
  this.modalCtrl.dismiss(null, 'cerrado');
}

onSubmit() {
  if (this.edit) {
      const clienteActualizado: ClienteModel = {
          ...this.registrarForm.value,
          idcliente: this.cliente?.idcliente, // Debería ser un número válido aquí
      };

      if (this.cliente?.idcliente !== undefined) {
          this.servicecliente
              .Editar(clienteActualizado, this.cliente.idcliente)
              .subscribe(
                  (response) => {
                      this.modalCtrl.dismiss(response, 'actualizado');
                      console.log('Cliente actualizado:', response);
                      window.location.reload();
                  },
                  (error) => {
                      console.error('Error al actualizar el cliente:', error);
                  }
              );
      } else {
          console.error('El ID del cliente es undefined', this.tempidCliente);
      }
  } else {
      // Lógica para agregar nuevo cliente
      const cliente: ClienteModel = this.registrarForm.value;
      this.servicecliente.Agregar(cliente).subscribe(
          (response) => {
              this.modalCtrl.dismiss(response, 'creado');
              console.log('Cliente creado:', response);
              this.presentToast('Cliente creado con éxito.'); // Mostrar el toast
          },
          (error) => {
              console.error('Error al crear el cliente:', error);
          }
      );
  }
}


}
