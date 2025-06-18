import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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

  userLoginObj: User = {
    email: '',
    senha: ''
  }

  router = inject(Router);
  toastr = inject(ToastrService);

  userService = inject(UserService);
  users: User[] = [];

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  login() {
    this.submitLoginTentado = true;

    if (!this.formularioValido()) {
      this.toastr.error("Formulário inválido. Verifique os campos.")
      return;
    }

    this.userService.getUsuarios().subscribe({
      next: (users) => {
        const usuarioEncontrado = users.find(
          (user: any) =>
            user.email === this.userLoginObj.email &&
            user.senha === this.userLoginObj.senha
        );

        const isUsuarioEmailEncontrado: boolean = users.some((user: any) => user.email === this.userLoginObj.email)

        if (isUsuarioEmailEncontrado) {
          if (users.some((user: any) => user.senha === this.userLoginObj.senha)) {
            this.toastr.success("Login realizado!")

            localStorage.setItem(
              'usuarioLogado',
              JSON.stringify(usuarioEncontrado)
            );

            this.router.navigate(['/events'])
          } else {
            this.toastr.error("Senha incorreta.");
          }
        } else {
          this.toastr.warning("Usuário não cadastrado");
        }
      },
      error: () => {
        this.toastr.error("Erro ao acessar a API")
      }
    })
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
