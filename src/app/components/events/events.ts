import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  imports: [MatIconModule, CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  isTabela: boolean = false;

  eventService = inject(EventService);
  events: Event[] = [];

  ngOnInit() {
    this.eventService.getEventos().subscribe((data) => {
      this.events = data;
    })
  }

  trocarVisualizacao() {
    this.isTabela = !this.isTabela;
  }
}
