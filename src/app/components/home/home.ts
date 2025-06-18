import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  router = inject(Router);

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
