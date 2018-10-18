import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RoomService} from './shared/room.service';
import {RoomResponseModel} from './shared/roomResponse.model';
import {DeviceModel} from '../device/shared/device.model';

@Component({
    selector: 'moses-home',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @Output() room: RoomResponseModel = {world: '', room: {id: '', name: '', devices: null}};
    @Output() devices: DeviceModel[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private roomService: RoomService,
                ) {
    }

    ngOnInit() {
        this.initRoom();
        this.initDevices();
    }

    add() {
        this.roomService.openDeviceCreateDialog(this.room);
    }

    deleteRoom() {
        this.roomService.openRoomDeleteDialog(this.room);
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
}
