import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {StatesComponent} from './components/states/states.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatButtonModule,
        RouterModule,
        MatIconModule

    ],
    declarations: [
        ToolbarComponent,
        SidenavComponent,
        StatesComponent,
    ],
    exports: [
        ToolbarComponent,
        SidenavComponent,
        StatesComponent
    ],

})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}