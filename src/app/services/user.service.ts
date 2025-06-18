import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model'; // interface opcional
import { API_URL } from '../../../api';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private httpClient = inject(HttpClient);

  getUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_URL}/usuarios`);
  }

  getUsuarioId(id: number): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/usuarios/${id}`);
  }

  addUsuario(user: User): Observable<User> {
    return this.httpClient.post<User>(`${API_URL}/usuarios`, user);
  }

  updateUsuario(user: User): Observable<User> {
    return this.httpClient.put<User>(`${API_URL}/usuarios/${user.id}`, user);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/usuarios/${id}`);
  }
}
