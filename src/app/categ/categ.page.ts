import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { CategoriaModel } from '../models/categoria.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarcategoriaPage } from '../agregarcategoria/agregarcategoria.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categ.page.html',
  styleUrls: ['./categ.page.scss'],
})
export class CategPage implements OnInit {

  categorias: CategoriaModel[] | undefined;

  constructor(private service: CategoriasService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.service.ObtenerTodos().subscribe(response => {
      this.categorias = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarcategoriaPage,
      cssClass: 'my-custom-class'  // Opcional: puedes agregar una clase CSS personalizada
    });

    modal.onDidDismiss().then((data) => {
      // Verifica si se ha creado una nueva categoría
      if (data.data && data.data !== 'cerrado') {
        this.categorias?.push(data.data);  // Agrega la nueva categoría a la lista
      }
    });

    return await modal.present();
  }

  loadCategorias() {
    this.service.ObtenerTodos().subscribe(
      response => {
        this.categorias = response;
      },
      error => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  async openEditModal(categoria: CategoriaModel) {
    console.log('Abriendo modal para editar la categoría:', categoria);
    const modal = await this.modalCtrl.create({
      component: AgregarcategoriaPage,
      componentProps: {
        categoria: categoria, // Pasando la categoría correcta
        edit: true // Establece la variable edit como true
      }
    });
  
    modal.onDidDismiss().then((result) => {
      // Maneja el resultado del modal aquí
    });
  
    return await modal.present();
  }

  // Método para abrir el modal en modo edición
  editCategoria(categoria: CategoriaModel) {
    this.openEditModal(categoria);
  }

  eliminarCategoria(id: number) {
    this.service.Eliminar(id).subscribe(() => {
      this.obtenerCategorias(); // Recargar la lista después de eliminar
    });
  }

}
