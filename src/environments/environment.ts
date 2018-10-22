// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    keyCloakRealm: 'master',
    keyCloakClientId: 'frontend',
    zwaySwitchBinaryTypeId: 'iot#11992b78-cb4d-4bf9-b6e6-7c4522b1427f',
    /** URLs */
    mosesUrl: 'https://api.sepl.infai.org/moses',
    keycloakUrl: 'https://auth.sepl.infai.org',
    permissionSearchUrl: 'https://api.sepl.infai.org/permission/search',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
