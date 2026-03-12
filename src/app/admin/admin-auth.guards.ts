import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

import { AdminAuthService } from './admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? true : router.createUrlTree(['/admin/login']);
};

export const adminGuestGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? router.createUrlTree(['/admin']) : true;
};
