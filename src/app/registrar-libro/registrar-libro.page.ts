import { Component } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-libro',
  templateUrl: './registrar-libro.page.html',
  styleUrls: ['./registrar-libro.page.scss'],
})
export class RegistrarLibroPage {
  libro = {
    titulo: '',
    editorial: '',
    anopublicacion: '',
    cantidad: ''
  };

  constructor(private libroService: LibroService, private router: Router) {}

  registrarLibro() {
    this.libroService.addLibro(this.libro).subscribe(() => {
        this.router.navigate(['/home']).then(() => {
            window.location.reload(); 
        });
    });
}

}
