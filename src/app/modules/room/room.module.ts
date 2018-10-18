import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RoomComponent} from './room.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatRadioModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoomDeleteDialogComponent} from './dialogs/room-delete-dialog.component';
import {RoomNewDeviceDialogComponent} from './dialogs/room-new-device-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoomEditDeviceDialogComponent} from './dialogs/room-edit-device-dialog.component';
import {RoomAddChangeRoutineDialogComponent} from './dialogs/room-add-change-routine-dialog.component';
import {RoomEditChangeRoutineDialogComponent} from './dialogs/room-edit-change-routine-dialog.component';
import {RoomAddDeviceStateDialogComponent} from './dialogs/room-add-device-state-dialog.component';
import {RoomEditStateDialogComponent} from './dialogs/room-edit-state-dialog.component';

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
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatRadioModule,
        RouterModule.forChild([room])],
    declarations: [
        RoomComponent,
        RoomDeleteDialogComponent,
        RoomNewDeviceDialogComponent,
        RoomEditDeviceDialogComponent,
        RoomAddChangeRoutineDialogComponent,
        RoomEditChangeRoutineDialogComponent,
        RoomAddDeviceStateDialogComponent,
        RoomEditStateDialogComponent,
    ],
    entryComponents: [RoomDeleteDialogComponent,
        RoomNewDeviceDialogComponent,
        RoomEditDeviceDialogComponent,
        RoomAddChangeRoutineDialogComponent,
        RoomEditChangeRoutineDialogComponent,
        RoomAddDeviceStateDialogComponent,
        RoomEditStateDialogComponent,
    ],
})
export class RoomModule {
}
