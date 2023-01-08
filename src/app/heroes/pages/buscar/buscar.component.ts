import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino:string = ''
  heroes: Heroes[]= [];
  hereoSeleccionado: Heroes | undefined;

  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.HeroesService.getSugerencia(this.termino.trim())
    .subscribe(hero => this.heroes = hero)
  }
  opcionSeleccionada(event: any){
    // console.log(event)

    if(!event.option.value){
      this.hereoSeleccionado = undefined;
      return;
    }

    const heroe: Heroes = event.option.value;
    console.log(heroe)
    this.HeroesService.getHeroePorId(heroe.id!).subscribe(hero => this.hereoSeleccionado = hero)
  }

}
