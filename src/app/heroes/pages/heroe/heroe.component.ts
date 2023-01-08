import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroes;

  constructor(private actvRoute: ActivatedRoute, private HeroesService:HeroesService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.heroe)
    //aca cuando se consegui la id hay que hacer una comunicacion con el backend para traer la info que corresponde a ese id
    this.actvRoute.params
    .pipe(
      switchMap(({id})=>this.HeroesService.getHeroePorId(id))
    ).subscribe(heroes => this.heroe = heroes)
    
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
