import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  mostrarSenha: boolean = false;
  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  router = inject(Router); // injeção de dependencia

  userLoginObj: any = {
    email: '',
    senha: ''
  }

  login(){
    const isLocalData = localStorage.getItem("angular18Local");

    if(isLocalData !== null){
      const users = JSON.parse(isLocalData);

      const isUsuarioEmailEncontrado : boolean = users.some((user: any) => user.email === this.userLoginObj.email)

      if(isUsuarioEmailEncontrado){
        if(users.some((user: any) => user.senha === this.userLoginObj.senha)){
          this.router.navigateByUrl('events')
        }else {
        alert("Senha incorreta")
      }
      } else {
        alert("Usuário não cadastrado")
      }
    }else {
      alert("Nenhum usuário encontrado")
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }


}
