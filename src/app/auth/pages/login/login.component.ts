import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private Router:Router,
              private authService:AuthService) { }

  login(){
    //Ir al backend
    // un usuario
    this.authService.login().subscribe(resp=>{
      console.log(resp)
      if(resp.id){
        this.Router.navigate(['./heroes']);

      }
    })


  }


}
