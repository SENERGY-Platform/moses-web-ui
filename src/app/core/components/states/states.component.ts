import {Component, OnInit} from '@angular/core';
import {RoomResponseModel} from '../../../modules/room/shared/roomResponse.model';
import {RoomService} from '../../../modules/room/shared/room.service';
import {WorldModel} from '../../../modules/world/shared/world.model';
import {WorldService} from '../../../modules/world/shared/world.service';
import {ResponsiveService} from '../../services/responsive.service';
import {StatesMapModel} from './shared/states-map.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ChangeRoutineService} from '../../../modules/change-routines/shared/change-routine.service';

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

    type = '';
    room: RoomResponseModel = {world: '', room: {id: '', name: '', devices: null, states: null, change_routines: null}};
    world: WorldModel = {id: '', name: '', rooms: null, states: null};
    gridCols = 0;
    stateMap: StatesMapModel = {};
    ready = false;
    temperature = 0;
    humidity = 0;
    lux = 0;
    co = 0;

    private typeId = '';

    constructor(private roomService: RoomService,
                private changeRoutineService: ChangeRoutineService,
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
            case 'room': {
                this.roomService.openRoomDeleteDialog(this.room);
                break;
            }
            case 'world': {
                this.worldService.openDeleteDialog(this.typeId);
                break;
            }
        }
    }

    edit(): void {
        this.changeRoutineService.openEditChangeRoutineDialog(this.type, this.typeId);
    }

    add(): void {
        this.changeRoutineService.openCreateChangeRoutineDialog(this.type, this.typeId);
    }

    clicked() {
        const updateStateMap: StatesMapModel = {};
        updateStateMap['humidity'] = this.humidity;
        updateStateMap['lux'] = this.lux;
        updateStateMap['temperature'] = this.temperature;
        updateStateMap['co-ppm'] = this.co;
        switch (this.type) {
            case 'room': {
                this.room.room.states = updateStateMap;
                this.roomService.update(this.room.room).subscribe();
                break;
            }
            case 'world': {
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
        this.co = <number>this.stateMap['co-ppm'];
    }

    private getStateMap(roomId: string, worldId: string) {
        if (roomId !== undefined) {
          this.roomService.get(roomId).subscribe((room: RoomResponseModel | null) => {
                if (room !== null) {
                    this.room = room;
                    this.typeId = this.room.room.id;
                    this.stateMap = room.room.states || {};
                    this.type = 'room';
                    this.setValues();
                    this.ready = true;
                }
            });
        } else {
            if (worldId !== undefined) {
                this.worldService.get(worldId).subscribe((world: WorldModel | null) => {
                    if (world !== null) {
                        this.world = world;
                        this.typeId = this.world.id;
                        this.stateMap = world.states || {};
                        this.type = 'world';
                        this.setValues();
                        this.ready = true;
                    }
                });
            }
        }

    }
}
