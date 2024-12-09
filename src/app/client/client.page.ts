import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ClienteModel } from '../models/cliente.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarclientePage } from '../agregarcliente/agregarcliente.page';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  clientes: ClienteModel[] | undefined;

  constructor(private service: ClientesService,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.obtenerClientes();
  }

  obtenerClientes(){

    this.service.ObtenerTodos().subscribe(response => {
      this.clientes = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarclientePage,
      cssClass: 'my-custom-class'  // Opcional: puedes agregar una clase CSS personalizada
    });

    modal.onDidDismiss().then((data) => {
      // Verifica si se ha creado un nuevo producto
      if (data.data && data.data !== 'cerrado') {
        this.clientes?.push(data.data);  // Agrega el nuevo producto a la lista
      }
    });

    return await modal.present();
  }

  loadClients() {
    this.service.ObtenerTodos().subscribe(
      response => {
        this.clientes = response;
      },
      error => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  async openEditModal(cliente: ClienteModel) {
    console.log('Abriendo modal para editar el cliente:', cliente);
    const modal = await this.modalCtrl.create({
      component: AgregarclientePage,
      componentProps: {
        cliente: cliente, // Asegúrate de que aquí estás pasando el producto correcto
        edit: true // Establece la variable edit como true
      }
    });
  
    modal.onDidDismiss().then((result) => {
      // Maneja el resultado del modal aquí
    });
  
    return await modal.present();
  }
  
  // Método para abrir el modal en modo edición
  editClient(cliente: ClienteModel) {
    this.openEditModal(cliente);
  }


  eliminarCliente(id: number) {
    this.service.Eliminar(id).subscribe(() => {
      this.obtenerClientes(); // Recargar la lista después de eliminar
    });
  }

}
