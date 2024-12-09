import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriasService } from '../services/categorias.service';
import { CategoriaModel } from '../models/categoria.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarcategoriaPage implements OnInit {

  edit = false;

  @Input() categoria: CategoriaModel | undefined;
  datos = {
    descripcion: '',
    estado: ''
  };

  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  validation_messages = {
    descripcion: [{ type: 'required', message: 'Escriba la descripción.' }],
    estado: [{ type: 'required', message: 'Escriba el estado.' }],
  };

  registrarForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private serviceCategoria: CategoriasService,
    public formBuilder: FormBuilder,
    private toastController: ToastController
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

  tempidCategoria: number | undefined;

  ngOnInit() {

    console.log('Categoría recibida en AgregarCategoriaPage:', this.categoria);

    if (this.categoria) {
      // Imprimir las claves del objeto
      console.log('Claves de la categoría:', Object.keys(this.categoria));

      // Verificar el ID
      console.log('ID de la categoría:', this.categoria.idcategoria); // Asegúrate de que este sea el nombre correcto
    } else {
      console.error('No se recibió ninguna categoría.');
    }

    // Guardar el ID de la categoría temporalmente para su uso posterior
    this.tempidCategoria = this.categoria?.idcategoria;

    // Aquí puedes inicializar el formulario si estás en modo edición
    if (this.edit && this.categoria) {
      this.registrarForm.setValue({
        descripcion: this.categoria.descripcion,
        estado: this.categoria.estado
      });

      console.log('ID de la categoría:', this.categoria.idcategoria); // Verificar el ID de la categoría
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.edit) {
      const categoriaActualizada: CategoriaModel = {
        ...this.registrarForm.value,
        idcategoria: this.categoria?.idcategoria, // Debería ser un número válido aquí
      };

      if (this.categoria?.idcategoria !== undefined) {
        this.serviceCategoria
          .Editar(categoriaActualizada, this.categoria.idcategoria)
          .subscribe(
            (response) => {
              this.modalCtrl.dismiss(response, 'actualizado');
              console.log('Categoría actualizada:', response);
              window.location.reload();
            },
            (error) => {
              console.error('Error al actualizar la categoría:', error);
            }
          );
      } else {
        console.error('El ID de la categoría es undefined', this.tempidCategoria);
      }
    } else {
      // Lógica para agregar nueva categoría
      const categoria: CategoriaModel = this.registrarForm.value;
      this.serviceCategoria.Agregar(categoria).subscribe(
        (response) => {
          this.modalCtrl.dismiss(response, 'creado');
          console.log('Categoría creada:', response);
          this.presentToast('Categoría creada con éxito.'); // Mostrar el toast
        },
        (error) => {
          console.error('Error al crear la categoría:', error);
        }
      );
    }
  }
}

