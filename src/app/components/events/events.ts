import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-events',
  imports: [MatIconModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  isTabela: boolean = false;

  trocarVisualizacao() {
    this.isTabela = !this.isTabela;
  }
}
