import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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

  userCadastroObj: User = {
    email: '',
    senha: ''
  }

  userConfirmaSenha: any = {
    confirmaSenha: ''
  }

  router = inject(Router);
  toastr = inject(ToastrService);
  userService = inject(UserService);

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

    this.userService.getUsuarios().subscribe(users => {
      const isUsuarioEmailEncontrado : boolean = users.some((user: any) => user.email === this.userCadastroObj.email);

      if(isUsuarioEmailEncontrado){
        this.toastr.info('Usuário já cadastrado no sistema.')
      } else {
        this.userService.addUsuario(this.userCadastroObj).subscribe(novoUsuario => {
          localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(novoUsuario)
          );

          this.toastr.success('Cadastro bem-sucedido');
          this.router.navigate(['/events']);
        })
      }
    })
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
