import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {RoomComponent} from './room.component';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

const room = {path: 'world/:worldid/room/:roomid', pathMatch: 'full', component: RoomComponent, data: {header: 'Room'}};

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        RouterModule.forChild([room])],
    declarations: [
        RoomComponent,
    ],
    entryComponents: [],
})
export class RoomModule {
}
