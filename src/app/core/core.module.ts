import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatToolbarModule
    ],
    declarations: [
        ToolbarComponent,
    ],
    exports: [
        ToolbarComponent,
    ],

})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}