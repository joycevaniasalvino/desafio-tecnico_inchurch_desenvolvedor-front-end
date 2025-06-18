import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  imports: [MatIconModule],
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
