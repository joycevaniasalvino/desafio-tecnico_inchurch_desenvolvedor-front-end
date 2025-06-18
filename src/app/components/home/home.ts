import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  router = inject(Router);

  userService = inject(UserService);
  users: User | null = null;

  userLogado: any;

  ngOnInit() {
    this.userLogado = localStorage.getItem('usuarioLogado');
    if (this.userLogado) {
      this.userLogado = JSON.parse(this.userLogado)

      this.userService.getUsuarioId(this.userLogado.id).subscribe((data) => {
        this.users = data;
      });

    }

  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  abrirModal() {
    document.getElementById("modalOverlay")!.classList.add("show");
  }

  fecharModalDireto() {
    document.getElementById("modalOverlay")!.classList.remove("show");
  }
}
