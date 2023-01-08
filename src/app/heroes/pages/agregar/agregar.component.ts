import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },

  ]

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''

  }

  constructor(private HeroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }
    this.ActivatedRoute.params.pipe(switchMap(({ id }) => this.HeroesService.getHeroePorId(id))).subscribe(hero => this.heroe = hero)
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //actualizar
      this.HeroesService.actualizarHeroe(this.heroe).subscribe(hero => this.mostrarSnakbar('registro actualizado'));
    } else {
      //crear
      this.HeroesService.agregarHeroe(this.heroe)
        .subscribe(resp => { this.router.navigate(['/heroes/editar', resp.id]) });
      this.mostrarSnakbar('registro creado');
    }
  }
  borrar() {
    this.HeroesService.borrarHeroe(this.heroe.id!).subscribe(resp => {
      this.router.navigate(['/heroes']);

    })
  }
  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }

}
