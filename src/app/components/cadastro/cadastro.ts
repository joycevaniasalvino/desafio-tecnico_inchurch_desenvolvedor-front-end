import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  submitCadastroTentado = false;

  mostrarSenhaCadastro: boolean = false;
  mostrarConfirmaSenhaCadastro: boolean = false;

  userCadastroObj: any = {
    email: '',
    senha: ''
  }

  userConfirmaSenha: any = {
    confirmaSenha: ''
  }

  router = inject(Router);
  toastr = inject(ToastrService);

  alternarVisibilidadeSenhaCadastro() {
    this.mostrarSenhaCadastro = !this.mostrarSenhaCadastro;
  }

  alternarVisibilidadeConfirmarSenhaCadastro() {
    this.mostrarConfirmaSenhaCadastro = !this.mostrarConfirmaSenhaCadastro;
  }

  cadastrar(){
    this.submitCadastroTentado = true;

    if(!this.formularioValido()){
      this.toastr.error("Formulário inválido. Verifique os campos.")
      return;
    }

    const isLocalData = localStorage.getItem("usuariosCadastrados");
    if(isLocalData !== null){

      const users = JSON.parse(isLocalData);

      const isUsuarioEmailEncontrado : boolean = users.some((user: any) => user.email === this.userCadastroObj.email);

      if(isUsuarioEmailEncontrado){
        this.toastr.info('Usuário já cadastrado no sistema')
      } else {
        const localArray = JSON.parse(isLocalData);
        localArray.push(this.userCadastroObj);
        localStorage.setItem("usuariosCadastrados", JSON.stringify(localArray));

        localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(this.userCadastroObj)
          );

        this.toastr.success('Cadastro bem-sucedido');
        this.router.navigate(['/events']);
      }

    } else{
      const localArray = [];
      localArray.push(this.userCadastroObj);
      localStorage.setItem("usuariosCadastrados", JSON.stringify(localArray))

      localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(this.userCadastroObj)
          );

      this.toastr.success('Cadastro bem-sucedido')
      this.router.navigate(['/events'])
    }

  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  private formularioValido(): boolean {
    const { email, senha } = this.userCadastroObj;
    const { confirmaSenha} = this.userConfirmaSenha;

    return (
      email.trim() !== '' &&
      senha.trim() !== '' &&
      confirmaSenha.trim() !== '' &&
      senha === confirmaSenha
    );
  }
}
