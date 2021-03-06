import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        MatMenuModule,
        MatDividerModule,
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