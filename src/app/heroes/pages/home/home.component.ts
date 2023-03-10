import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get auth(){
    return this,this.authService.auth
  }

  constructor(private Router:Router,
              private authService : AuthService) { }

  ngOnInit(): void {
  }

  
  logout(){
    //Ir al backend
    // un usuario

    this.Router.navigate(['./auth']);

  }


}
