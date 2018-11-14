import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';


@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {

    constructor(private keycloakService: KeycloakService) {
    }

    getUserName(): string {
        return this.keycloakService.getUsername();
    }

    logout() {
        this.keycloakService.logout();
    }
}
