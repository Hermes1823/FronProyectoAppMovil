import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService, Libro } from '../services/libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.page.html',
  styleUrls: ['./editar-libro.page.scss'],
})
export class EditarLibroPage implements OnInit {
  libro: Libro = { titulo: '', editorial: '', anopublicacion: 0, cantidad: 0, estado: 1 }; // Inicialización

  constructor(
    private activatedRoute: ActivatedRoute,
    private libroService: LibroService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibro(+id).subscribe(data => {
        this.libro = data;
      }, error => {
        console.error('Error al obtener el libro:', error);
      });
    }
  }

  editarLibro() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.updateLibro(this.libro, +id).subscribe(() => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload(); // Recarga la página
        });
      }, error => {
        console.error('Error al editar el libro:', error);
      });
    }
  }
}
