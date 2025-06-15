import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Events } from './components/events/events';

export const routes: Routes = [
  {
    path: "",
    component: Login
  },
  {
    path: "home",
    component: Home
  },
  {
    path: "events",
    component: Events
  }
];
