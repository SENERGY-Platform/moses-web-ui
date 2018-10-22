import {Component, Input, OnInit, Output} from '@angular/core';
import {RoomResponseModel} from '../../../modules/room/shared/roomResponse.model';
import {RoomService} from '../../../modules/room/shared/room.service';
import {WorldModel} from '../../../modules/world/shared/world.model';
import {WorldService} from '../../../modules/world/shared/world.service';
import {ResponsiveService} from '../../services/responsive.service';
import {StatesMapModel} from './shared/states-map.model';

const grid = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 2],
    ['lg', 4],
    ['xl', 4],
]);

@Component({
    selector: 'moses-states',
    templateUrl: './states.component.html',
    styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

    @Input() type = '';
    @Input() room: RoomResponseModel = {world: '', room: {id: '', name: '', devices: null, states: null}};
    @Input() world: WorldModel = {id: '', name: '', rooms: null, states: null};
    @Output() gridCols = 0;
    @Output() stateMap: StatesMapModel = {};

    constructor(private roomService: RoomService,
                private worldService: WorldService,
                private responsiveService: ResponsiveService) {
    }


    ngOnInit() {
        this.initGridCols();
        this.initStates();
    }

    delete(): void {
        switch (this.type) {
            case 'Room': {
                this.roomService.openRoomDeleteDialog(this.room);
                break;
            }
            case 'World': {
                console.log(this.world);
                this.worldService.openDeleteDialog(this.world);
                break;
            }
        }
    }

    private initGridCols(): void {
        this.gridCols = grid.get(this.responsiveService.getActiveMqAlias()) || 0;
        this.responsiveService.observeMqAlias().subscribe((mqAlias) => {
            this.gridCols = grid.get(mqAlias) || 0;
        });
    }

    private initStates(): void {
        switch (this.type) {
            case 'Room': {
                this.stateMap = this.room.room.states || {};
                break;
            }
            case 'World': {
                this.stateMap = this.world.states || {};
                break;
            }
        }
    }

}
