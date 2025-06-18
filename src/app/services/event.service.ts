import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

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

  getEventoId(id: string | undefined): Observable<Event> {
    return this.httpClient.get<Event>(`${API_URL}/eventos/${id}`);
  }

  addEvento(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${API_URL}/eventos`, event);
  }

  updateEvento(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(`${API_URL}/eventos/${event.id}`, event);
  }

  deleteEvento(id: string): Observable<any> {
    return this.httpClient.delete(`${API_URL}/eventos/${id}`);
  }

  getEventosComLimites(pagina: number, limite: number): Observable<{ eventos: Event[] }> {
    return this.httpClient.get<Event[]>(`${API_URL}/eventos?_page=${pagina}&_limit=${limite}`, {
      observe: 'response'
    }).pipe(
      map(response => ({
        eventos: response.body || [],
      }))
    );
  }

}
