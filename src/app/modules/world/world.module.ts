import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {WorldComponent} from './world.component';
import {WorldDeleteDialogComponent} from './dialogs/world-delete-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

const world = {path: 'world/:id', pathMatch: 'full', component: WorldComponent, data: {header: 'World'}};

@NgModule({
    imports: [
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatButtonModule,
        RouterModule.forChild([world])],
    declarations: [
        WorldComponent,
        WorldDeleteDialogComponent,
    ],
    entryComponents: [WorldDeleteDialogComponent],
})
export class WorldModule {
}
