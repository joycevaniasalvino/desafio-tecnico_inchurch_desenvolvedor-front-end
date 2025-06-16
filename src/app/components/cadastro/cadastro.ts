import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  mostrarSenhaCadastro: boolean = false;
  alternarVisibilidadeSenhaCadastro() {
    this.mostrarSenhaCadastro = !this.mostrarSenhaCadastro;
  }

  mostrarConfirmaSenhaCadastro: boolean = false;
  alternarVisibilidadeConfirmarSenhaCadastro() {
    this.mostrarConfirmaSenhaCadastro = !this.mostrarConfirmaSenhaCadastro;
  }

  router = inject(Router); // injeção de dependencia

  userCadastroObj: any = {
    email: '',
    senha: ''
  }

  cadastrar(){
    const isLocalData = localStorage.getItem("angular18Local");
    if(isLocalData !== null){

      const users = JSON.parse(isLocalData);
      const isUsuarioEmailEncontrado : boolean = users.some((user: any) => user.email === this.userCadastroObj.email)

      if(isUsuarioEmailEncontrado){
        alert('Usuário já cadastrado no sistema')
      } else {
        const localArray = JSON.parse(isLocalData);
        localArray.push(this.userCadastroObj);
        localStorage.setItem("angular18Local", JSON.stringify(localArray))

        this.router.navigateByUrl('events')
      }

    } else{
      const localArray = [];
      localArray.push(this.userCadastroObj);
      localStorage.setItem("angular18Local", JSON.stringify(localArray))

      this.router.navigateByUrl('events')
      alert('cadastro bem-sucedido')
    }

  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
