import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {WorldComponent} from './world.component';
import {WorldDeleteDialogComponent} from './dialogs/world-delete-dialog.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WorldCreateRoomDialogComponent} from './dialogs/world-create-room-dialog.component';

const world = {path: 'world/:id', pathMatch: 'full', component: WorldComponent, data: {header: 'World'}};

@NgModule({
    imports: [
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        RouterModule.forChild([world])],
    declarations: [
        WorldComponent,
        WorldDeleteDialogComponent,
        WorldCreateRoomDialogComponent,
    ],
    entryComponents: [WorldDeleteDialogComponent, WorldCreateRoomDialogComponent],
})
export class WorldModule {
}
