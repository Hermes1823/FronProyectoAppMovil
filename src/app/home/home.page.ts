import { Component } from '@angular/core';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  libros: any[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }

  eliminarLibro(id: number) {
    this.libroService.deleteLibro(id).subscribe(() => {
      this.cargarLibros(); // Recargar la lista después de eliminar
    });
  }

}
