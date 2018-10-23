import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {StatesComponent} from './components/states/states.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatGridListModule,
        MatSliderModule,
        FormsModule,
        CommonModule,
        MatTooltipModule,
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