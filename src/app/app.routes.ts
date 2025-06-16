import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Events } from './components/events/events';
import { Cadastro } from './components/cadastro/cadastro';
import { authGuard } from './guards/auth-guard';
import { loggedInGuard } from './guards/logged-in-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
    data: { modo: 'login' },
    canActivate: [loggedInGuard]
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
        component: Events,
        canActivate: [authGuard]
      }
    ]
  }

];
