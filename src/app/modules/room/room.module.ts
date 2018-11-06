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
    MatMenuModule,
    MatRadioModule,
    MatSelectModule, MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoomDeleteDialogComponent} from './dialogs/room-delete-dialog.component';
import {RoomNewDeviceDialogComponent} from './dialogs/room-new-device-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoomEditDeviceDialogComponent} from './dialogs/room-edit-device-dialog.component';
import {RoomAddChangeRoutineDialogComponent} from './dialogs/room-add-change-routine-dialog.component';
import {RoomAddDeviceStateDialogComponent} from './dialogs/room-add-device-state-dialog.component';
import {RoomEditStateDialogComponent} from './dialogs/room-edit-state-dialog.component';
import {CoreModule} from '../../core/core.module';

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
        MatSlideToggleModule,
        MatSliderModule,
        CoreModule,
        RouterModule.forChild([room])],
    declarations: [
        RoomComponent,
        RoomDeleteDialogComponent,
        RoomNewDeviceDialogComponent,
        RoomEditDeviceDialogComponent,
        RoomAddChangeRoutineDialogComponent,
        RoomAddDeviceStateDialogComponent,
        RoomEditStateDialogComponent,
    ],
    entryComponents: [RoomDeleteDialogComponent,
        RoomNewDeviceDialogComponent,
        RoomEditDeviceDialogComponent,
        RoomAddChangeRoutineDialogComponent,
        RoomAddDeviceStateDialogComponent,
        RoomEditStateDialogComponent,
    ],
})
export class RoomModule {
}
