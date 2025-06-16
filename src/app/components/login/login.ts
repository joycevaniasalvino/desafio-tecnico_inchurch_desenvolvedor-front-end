import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  submitLoginTentado = false;

  mostrarSenha: boolean = false;

  userLoginObj: any = {
    email: '',
    senha: ''
  }

  router = inject(Router);
  toastr = inject(ToastrService);

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  login(){
    this.submitLoginTentado = true;

    if(!this.formularioValido()){
      this.toastr.error("Formulário inválido. Verifique os campos.")
      return;
    }

    const isLocalData = localStorage.getItem("usuariosCadastrados");

    if(isLocalData !== null){
      const users = JSON.parse(isLocalData);

      const usuarioEncontrado = users.find(
          (user: any) =>
            user.email === this.userLoginObj.email &&
            user.senha === this.userLoginObj.senha
        );

      const isUsuarioEmailEncontrado : boolean = users.some((user: any) => user.email === this.userLoginObj.email)

      if(isUsuarioEmailEncontrado){
        if(users.some((user: any) => user.senha === this.userLoginObj.senha)){
          this.toastr.success("Login realizado!")

          localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(usuarioEncontrado)
          );

          this.router.navigate(['/events'])
        }else {
        this.toastr.error("Senha incorreta.");
      }
      } else {
        this.toastr.warning("Usuário não cadastrado")
      }
    }else {
      this.toastr.error("Nenhum usuário encontrado")
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  private formularioValido(): boolean {
    const { email, senha } = this.userLoginObj;

    return (
      email.trim() !== '' &&
      senha.trim() !== ''
    );
  }
}
