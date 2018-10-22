import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RoomService} from './shared/room.service';
import {RoomResponseModel} from './shared/roomResponse.model';
import {DeviceModel} from '../device/shared/device.model';
import {environment} from '../../../environments/environment';
import {ResponsiveService} from '../../core/services/responsive.service';

const grid = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 6],
]);

@Component({
    selector: 'moses-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @Output() room: RoomResponseModel = {world: '', room: {id: '', name: '', devices: null}};
    @Output() devices: DeviceModel[] = [];
    @Output() value = 50;
    @Output() switchTypeId = environment.zwaySwitchBinaryTypeId;
    @Output() gridCols = 0;

    constructor(private activatedRoute: ActivatedRoute,
                private roomService: RoomService,
                private responsiveService: ResponsiveService,
                ) {
    }

    ngOnInit() {
        this.initRoom();
        this.initDevices();
        this.initGridCols();
    }

    add() {
        this.roomService.openDeviceCreateDialog(this.room);
    }

    deleteDevice(deviceId: string) {
        this.roomService.openDeviceDeleteDialog(this.room, deviceId);
    }

    editDevice(deviceId: string) {
        this.roomService.openDeviceEditDialog(deviceId);
    }

    addChangeRoutine(deviceId: string) {
        this.roomService.openCreateChangeRoutineDialog(deviceId);
    }

    addState(device: DeviceModel) {
        this.roomService.openStateCreateDialog(device);
    }

    editChangeRoutine(deviceId: string) {
        this.roomService.openEditChangeRoutineDialog(deviceId);
    }

    editStates(deviceId: string) {
        this.roomService.openStateEditDialog(deviceId);
    }

    slideChange(device: DeviceModel, slide: boolean) {
        this.roomService.slideChangeStartServices(device, slide);
    }

    private initDevices() {
        this.roomService.currentDevices.subscribe((devices: DeviceModel[]) => {
            this.devices = devices;
        });
    }

    private initRoom() {

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.roomService.get(params['roomid']).subscribe((room: RoomResponseModel | null) => {
                    if (room !== null) {
                        this.room = room;
                        this.roomService.refreshDevices(this.room);
                    }
                });
            }
        );
    }

    private initGridCols(): void {
        this.gridCols = grid.get(this.responsiveService.getActiveMqAlias()) || 0;
        this.responsiveService.observeMqAlias().subscribe((mqAlias) => {
            this.gridCols = grid.get(mqAlias) || 0;
        });
    }
}
