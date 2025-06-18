import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  imports: [MatIconModule, CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  isTabela: boolean = false;

  eventService = inject(EventService);

  allEvents: Event[] = [];
  events: Event[] = [];


  totalEventos: number = 0;

  paginaAtual = 1;
  eventosPorPagina = 8;


  ngOnInit() {
    this.eventService.getEventos().subscribe((data) => {
      this.allEvents = data;
      this.totalEventos = data.length;
      this.loadEvents();
    });
  }


  trocarVisualizacao() {
    this.isTabela = !this.isTabela;
    this.eventosPorPagina = this.isTabela ? 6 : 8;
    this.paginaAtual = 1;
    this.loadEvents();
  }

  isIdPar(id: string | undefined): boolean {
    return Number(id) % 2 === 0;
  }

  irParaPagina(pagina:any) {
    this.paginaAtual = pagina;
    this.loadEvents();
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalEventos / this.eventosPorPagina);
  }

  get paginasVisiveis(): (number | string)[] {
    const total = this.totalPaginas;
    const atual = this.paginaAtual;
    const visiveis: (number | string)[] = [];

    if (total <= 4) {
      for (let i = 1; i <= total; i++) visiveis.push(i);
    } else {
      if (atual <= 2) {
        visiveis.push(1, 2, 3, '...', total);
      } else if (atual >= total - 1) {
        visiveis.push(1, '...', total - 2, total - 1, total);
      } else {
        visiveis.push(1, 2, atual, '...', total);
      }
    }

    return visiveis;
  }


  private loadEvents() {
    const inicio = (this.paginaAtual - 1) * this.eventosPorPagina;
    const fim = inicio + this.eventosPorPagina;
    this.events = this.allEvents.slice(inicio, fim);
  }


}
