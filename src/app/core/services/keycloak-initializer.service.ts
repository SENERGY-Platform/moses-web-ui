import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';

export function keycloakInitializerService(keycloak: KeycloakService): () => Promise<any> {
/*    const tokenStored = localStorage.getItem('kc_token');
    let token = '';
    if (tokenStored !== null) {
        token = tokenStored;
    }*/

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
        }
    });
/*        .then(success => {
        keycloak.getToken().then(res => {
            localStorage.setItem('kc_token', res);
        });
    });*/
}
