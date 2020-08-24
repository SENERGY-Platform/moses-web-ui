import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RoomComponent} from './room.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoomDeleteDialogComponent} from './dialogs/room-delete-dialog.component';
import {RoomNewDeviceDialogComponent} from './dialogs/room-new-device-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoomEditDeviceDialogComponent} from './dialogs/room-edit-device-dialog.component';
import {CoreModule} from '../../core/core.module';
import {RoomAddDeviceStateDialogComponent} from './dialogs/room-add-device-state-dialog.component';
import {RoomEditStateDialogComponent} from './dialogs/room-edit-state-dialog.component';

const room = {path: 'world/:worldid/room/:roomid', pathMatch: 'full', component: RoomComponent, data: {header: 'room'}};

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
        RoomAddDeviceStateDialogComponent,
        RoomEditDeviceDialogComponent,
        RoomEditStateDialogComponent,
    ],
})
export class RoomModule {
}
