import {Component, Input, OnInit, Output} from '@angular/core';
import {RoomResponseModel} from '../../../modules/room/shared/roomResponse.model';
import {RoomService} from '../../../modules/room/shared/room.service';
import {WorldModel} from '../../../modules/world/shared/world.model';
import {WorldService} from '../../../modules/world/shared/world.service';
import {ResponsiveService} from '../../services/responsive.service';
import {StatesMapModel} from './shared/states-map.model';
import {ActivatedRoute, Params} from '@angular/router';

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
    @Output() ready = false;
    @Output() temperature = 0;
    @Output() humidity = 0;
    @Output() lux = 0;

    constructor(private roomService: RoomService,
                private worldService: WorldService,
                private responsiveService: ResponsiveService,
                private activatedRoute: ActivatedRoute) {
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
                this.worldService.openDeleteDialog(this.world);
                break;
            }
        }
    }

    clicked() {
        const updateStateMap: StatesMapModel = {};
        updateStateMap['humidity'] = this.humidity;
        updateStateMap['lux'] = this.lux;
        updateStateMap['temperature'] = this.temperature;
        switch (this.type) {
            case 'Room': {
                this.room.room.states = updateStateMap;
                this.roomService.update(this.room.room).subscribe();
                break;
            }
            case 'World': {
                this.world.states = updateStateMap;
                this.worldService.update(this.world).subscribe();
                break;
            }
        }
    }

    formatLabel(value: number | null) {
        if (!value) {
            return 0;
        }
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    }

    private initGridCols(): void {
        this.gridCols = grid.get(this.responsiveService.getActiveMqAlias()) || 0;
        this.responsiveService.observeMqAlias().subscribe((mqAlias) => {
            this.gridCols = grid.get(mqAlias) || 0;
        });
    }

    private initStates(): void {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                const roomId = params['roomid'];
                const worldId = params['worldid'];
                this.getStateMap(roomId, worldId);
            });

    }

    private setValues() {
        this.humidity = <number>this.stateMap['humidity'];
        this.lux = <number>this.stateMap['lux'];
        this.temperature = <number>this.stateMap['temperature'];
    }

    private getStateMap(roomId: string, worldId: string) {
        if (roomId !== undefined) {
          this.roomService.get(roomId).subscribe((room: RoomResponseModel | null) => {
                if (room !== null) {
                    this.room = room;
                    this.stateMap = room.room.states || {};
                    this.type = 'Room';
                    this.setValues();
                    this.ready = true;
                }
            });
        } else {
            if (worldId !== undefined) {
                this.worldService.get(worldId).subscribe((world: WorldModel | null) => {
                    if (world !== null) {
                        this.world = world;
                        this.stateMap = world.states || {};
                        this.type = 'World';
                        this.setValues();
                        this.ready = true;
                    }
                });
            }
        }

    }
}
