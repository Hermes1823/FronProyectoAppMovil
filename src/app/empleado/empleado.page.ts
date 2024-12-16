import { EmpleadoModel } from './../models/empleado.model';
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarempleadoPage } from '../agregarempleado/agregarempleado.page';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

 empleados: EmpleadoModel[] | undefined;
 
   constructor(private service: EmpleadoService,
     private modalCtrl: ModalController) { }
 
   ngOnInit() {
 
     this.obtenerEmpleados();
   }
 
   obtenerEmpleados(){
 
     this.service.ObtenerTodos().subscribe(response => {
       this.empleados = response;
     });
   }
 
   async Agregar() {
     const modal = await this.modalCtrl.create({
       component: AgregarempleadoPage,
       cssClass: 'my-custom-class'  // Opcional: puedes agregar una clase CSS personalizada
     });
 
     modal.onDidDismiss().then((data) => {
       // Verifica si se ha creado un nuevo producto
       if (data.data && data.data !== 'cerrado') {
         this.empleados?.push(data.data);  // Agrega el nuevo producto a la lista
       }
     });
 
     return await modal.present();
   }
 
   loadEmpleados() {
     this.service.ObtenerTodos().subscribe(
       response => {
         this.empleados = response;
       },
       error => {
         console.error('Error al obtener empleados:', error);
       }
     );
   }
 
   async openEditModal(empleado: EmpleadoModel) {
     console.log('Abriendo modal para editar al empleado:', empleado);
     const modal = await this.modalCtrl.create({
       component: AgregarempleadoPage,
       componentProps: {
         empleado: empleado, // Asegúrate de que aquí estás pasando el producto correcto
         edit: true // Establece la variable edit como true
       }
     });
   
     modal.onDidDismiss().then((result) => {
       // Maneja el resultado del modal aquí
     });
   
     return await modal.present();
   }
   
   // Método para abrir el modal en modo edición
   editEmpleado(empleado: EmpleadoModel) {
     this.openEditModal(empleado);
   }
 
 
   eliminarEmpleado(id: number) {
     this.service.Eliminar(id).subscribe(() => {
       this.obtenerEmpleados(); // Recargar la lista después de eliminar
     });
   }
 
 
}
