import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {RoomComponent} from './room.component';
import {
    MatButtonModule,
    MatDialogModule, MatDividerModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoomDeleteDialogComponent} from './dialogs/room-delete-dialog.component';
import {RoomNewDeviceDialogComponent} from './dialogs/room-new-device-dialog.component';
import {CommonModule} from '@angular/common';

const room = {path: 'world/:worldid/room/:roomid', pathMatch: 'full', component: RoomComponent, data: {header: 'Room'}};

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        CommonModule,
        MatDividerModule,
        MatMenuModule,
        RouterModule.forChild([room])],
    declarations: [
        RoomComponent,
        RoomDeleteDialogComponent,
        RoomNewDeviceDialogComponent,
    ],
    entryComponents: [RoomDeleteDialogComponent, RoomNewDeviceDialogComponent,
    ],
})
export class RoomModule {
}
