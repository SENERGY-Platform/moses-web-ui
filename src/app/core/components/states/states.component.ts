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
        setInterval(() => {
            this.initStates();
        }, 30000);
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

    changed(key: string, value: number): void {
        const stateUpdate = this.stateMap;
        stateUpdate[key] = value;
        switch (this.type) {
            case 'Room': {
                this.room.room.states = stateUpdate;
                this.roomService.update(this.room.room).subscribe();
                break;
            }
            case 'World': {
                this.world.states = stateUpdate;
                this.worldService.update(this.world).subscribe();
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
                this.roomService.get(this.room.room.id).subscribe((room: RoomResponseModel | null) => {
                    if (room !== null) {
                        this.room = room;
                        this.stateMap = room.room.states || {};
                    }
                });
                break;
            }
            case 'World': {
                this.worldService.get(this.world.id).subscribe((world: WorldModel | null) => {
                    if (world !== null) {
                        this.world = world;
                        this.stateMap = world.states || {};
                    }
                });
                break;
            }
        }
    }

}
