import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {WorldComponent} from './world.component';
import {WorldDeleteDialogComponent} from './dialogs/world-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WorldCreateRoomDialogComponent} from './dialogs/world-create-room-dialog.component';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';

const world = {path: 'world/:worldid', pathMatch: 'full', component: WorldComponent, data: {header: 'world'}};

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
        CoreModule,
        CommonModule,
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
