import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Events } from './components/events/events';
import { Cadastro } from './components/cadastro/cadastro';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
    data: { modo: 'login' }
  },
  {
    path: 'cadastro',
    component: Cadastro,
    data: { modo: 'cadastro' }
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'events',
        component: Events
      }
    ]
  }

];
