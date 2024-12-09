import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor() { }

  accionBoton1() {
    console.log('Botón 1 presionado');
    // Lógica para el botón 1
  }

  accionBoton2() {
    console.log('Botón 2 presionado');
    // Lógica para el botón 2
  }

  accionBoton3() {
    console.log('Botón 3 presionado');
    // Lógica para el botón 3
  }
}
