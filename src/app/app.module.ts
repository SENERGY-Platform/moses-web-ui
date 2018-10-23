import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {keycloakInitializerService} from './core/services/keycloak-initializer.service';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './modules/home/home.module';
import {WorldModule} from './modules/world/world.module';
import {RoomModule} from './modules/room/room.module';
import {DeviceModule} from './modules/device/device.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        HomeModule,
        WorldModule,
        RoomModule,
        DeviceModule,
        KeycloakAngularModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: keycloakInitializerService,
            multi: true,
            deps: [KeycloakService]
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
