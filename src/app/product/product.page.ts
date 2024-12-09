import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productos: ProductoModel[] | undefined;

  constructor(private service: ProductosService,
              private modalCtrl: ModalController, private storage: Storage) { }

  async ngOnInit() {
    this.obtenerProductos();
    await this.storage.create();
    
  }

   async VerStorage(){

    let descripcion = await this.storage.get("descripcion");
      console.log("la descripcion del producto es: "+descripcion);



  }





  obtenerProductos() {
    this.service.ObtenerTodos().subscribe(response => {
      this.productos = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
      cssClass: 'my-custom-class'  // Opcional: puedes agregar una clase CSS personalizada
    });

    modal.onDidDismiss().then((data) => {
      // Verifica si se ha creado un nuevo producto
      if (data.data && data.data !== 'cerrado') {
        this.productos?.push(data.data);  // Agrega el nuevo producto a la lista
      }
    });

    return await modal.present();


    //guardar registro en localstore

    this.storage.set("descripcion","mejor producto del mes");


  }


  loadProducts() {
    this.service.ObtenerTodos().subscribe(
      response => {
        this.productos = response;
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Método para abrir el modal de agregar/editar producto
// En el componente donde abres el modal
// En el componente donde abres el modal
async openEditModal(producto: ProductoModel) {
  console.log('Abriendo modal para editar el producto:', producto);
  const modal = await this.modalCtrl.create({
    component: AgregarproductoPage,
    componentProps: {
      producto: producto, // Asegúrate de que aquí estás pasando el producto correcto
      edit: true // Establece la variable edit como true
    }
  });

  modal.onDidDismiss().then((result) => {
    // Maneja el resultado del modal aquí
  });

  return await modal.present();
}



  // Método para abrir el modal en modo edición
  editProduct(producto: ProductoModel) {
    this.openEditModal(producto);
  }


  eliminarProducto(id: number) {
    this.service.Eliminar(id).subscribe(() => {
      this.obtenerProductos(); // Recargar la lista después de eliminar
    });
  }
  
  
  
}
