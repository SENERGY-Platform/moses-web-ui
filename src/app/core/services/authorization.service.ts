import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private keycloakService: KeycloakService) {
  }

  getUserName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.keycloakService.loadUserProfile()
        .then(() => resolve(this.keycloakService.getUsername()))
        .catch(() => reject(undefined));
    });
  }

  logout() {
    this.keycloakService.logout();
  }
}
