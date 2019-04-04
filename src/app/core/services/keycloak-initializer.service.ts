import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';

export function keycloakInitializerService(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => keycloak.init({
        config: {
            url: environment.keycloakUrl + '/auth',
            realm: environment.keyCloakRealm,
            clientId: environment.keyCloakClientId
        },
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false,
            // token: token,
        },
        bearerPrefix: 'Bearer',
    });
}
