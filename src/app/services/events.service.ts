import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../../api';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private httpClient = inject(HttpClient);

  getEventos(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${API_URL}/eventos`);
  }

  getEventoId(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${API_URL}/eventos/${id}`);
  }

  addEvento(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${API_URL}/eventos`, event);
  }

  updateEvento(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(`${API_URL}/eventos/${event.id}`, event);
  }

  deleteEvento(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/eventos/${id}`);
  }
}
