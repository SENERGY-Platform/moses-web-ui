import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {RoomComponent} from './room.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoomDeleteDialogComponent} from './dialogs/room-delete-dialog.component';

const room = {path: 'world/:worldid/room/:roomid', pathMatch: 'full', component: RoomComponent, data: {header: 'Room'}};

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        RouterModule.forChild([room])],
    declarations: [
        RoomComponent,
        RoomDeleteDialogComponent,
    ],
    entryComponents: [RoomDeleteDialogComponent,
    ],
})
export class RoomModule {
}
