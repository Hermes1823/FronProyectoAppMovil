import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriasService } from '../services/categorias.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  edit = false;
  @Input() producto: ProductoModel | undefined;
  categorias: CategoriaModel[] | undefined;

  datos = {
    descripcion: '',
    idcategoria: '',
    precio: '',
    cantidad: '',
  };

  registrarForm: FormGroup;

  validation_messages = {
    descripcion: [{ type: 'required', message: 'Escriba Nombre.' }],
    idcategoria: [{ type: 'required', message: 'Seleccione categoria' }],
    precio: [{ type: 'required', message: 'Escriba precio' }],
    cantidad: [{ type: 'required', message: 'Escriba cantidad' }],
  };

  constructor(
    private modalCtrl: ModalController,
    private serviceproducto: ProductosService,
    private servicecategoria: CategoriasService,
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    private storage: Storage // Uso del almacenamiento
  ) {
    // Crear el formulario
    this.registrarForm = this.createFormGroup();
  }

  // Crear grupo de formulario
  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      idcategoria: new FormControl(null, [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    });
  }

  // Mostrar un mensaje Toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  // Verificar los datos en el almacenamiento
  async VerStorage() {
    const productoGuardado = await this.storage.get('producto');
    console.log('Datos del producto guardados en _ionickv:', productoGuardado);
  }

  tempidProducto: number | undefined;

  async ngOnInit() {
    // **Inicializar el almacenamiento**
    await this.storage.create();
    console.log('Almacenamiento inicializado');

    // Verificar si se recibió un producto
    if (this.producto) {
      console.log('Producto recibido en AgregarproductoPage:', this.producto);
      console.log('ID del producto:', this.producto.idproducto);
      this.tempidProducto = this.producto.idproducto;
    } else {
      console.error('No se recibió ningún producto.');
    }

    // Obtener las categorías
    this.servicecategoria.ObtenerTodos().subscribe(
      (response) => {
        this.categorias = response;

        if (this.edit && this.producto) {
          this.registrarForm.setValue({
            descripcion: this.producto.descripcion,
            idcategoria: this.producto.idcategoria || '',
            precio: this.producto.precio,
            cantidad: this.producto.cantidad,
          });
        }
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  // Cerrar el modal
  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  // Enviar el formulario
  onSubmit() {
    if (this.edit) {
      // Modo edición
      const productoActualizado: ProductoModel = {
        ...this.registrarForm.value,
        idproducto: this.producto?.idproducto,
      };

      if (this.producto?.idproducto !== undefined) {
        this.serviceproducto
          .Editar(productoActualizado, this.producto.idproducto)
          .subscribe(
            (response) => {
              this.modalCtrl.dismiss(response, 'actualizado');
              console.log('Producto actualizado:', response);
              this.presentToast('Producto actualizado con éxito.');
            },
            (error) => {
              console.error('Error al actualizar el producto:', error);
            }
          );
      } else {
        console.error('El ID del producto es undefined', this.tempidProducto);
      }
    } else {
      // Modo agregar
      const producto: ProductoModel = this.registrarForm.value;
      this.serviceproducto.Agregar(producto).subscribe(
        async (response) => {
          this.modalCtrl.dismiss(response, 'creado');
          console.log('Producto creado:', response);
          this.presentToast('Producto creado con éxito.');

          // Guardar en el almacenamiento
          const datosFormulario = this.registrarForm.value;
          try {
            await this.storage.set('producto', datosFormulario);
            console.log('Datos del formulario guardados en _ionickv:', datosFormulario);
          } catch (error) {
            console.error('Error al guardar en _ionickv:', error);
          }
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }
}
