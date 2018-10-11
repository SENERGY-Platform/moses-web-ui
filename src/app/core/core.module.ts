import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

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
        SidenavComponent
    ],
    exports: [
        ToolbarComponent,
        SidenavComponent
    ],

})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}