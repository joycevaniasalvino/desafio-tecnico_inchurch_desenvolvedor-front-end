import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (usuarioLogado) {
    toastr.info("Você já está logado.")
    router.navigate(['/events']);
    return false;
  }

  return true;
};
