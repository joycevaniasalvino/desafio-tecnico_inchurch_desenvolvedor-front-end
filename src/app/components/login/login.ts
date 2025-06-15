import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  mostrarSenha: boolean = false;

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
