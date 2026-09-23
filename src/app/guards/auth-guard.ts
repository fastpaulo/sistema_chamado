import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

// Protege rotas autenticadas (ex: /dashboard)
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
   console.log(authService)
    if (authService.isAuthenticated()) {
        return true;
    }

    // Redireciona para o login salvando a URL de destino
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
};

// Evita que usuários já logados acessem a tela de login
export const publicOnlyGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        router.navigate(['/home']);
        return false;
    }

    return true;
};