// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {


  constructor(protected override router: Router, protected keycloak: KeycloakService) {
    super(router, keycloak);
  }


  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (!this.authenticated) {
        await this.keycloakAngular.login();
      }

      const requiredRoles = route.data['roles'] || [];
      const hasAccess = requiredRoles.length === 0 || requiredRoles.every((role: string) => this.roles.includes(role));

      if (!hasAccess) {
        this.router.navigate(['/forbidden']);
      }

      resolve(hasAccess);
    });
  }
}