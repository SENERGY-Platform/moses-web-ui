import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RoomService} from './shared/room.service';
import {RoomModel} from './shared/room.model';
import {DeviceModel} from '../device/shared/device.model';

@Component({
    selector: 'moses-home',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @Output() room: RoomModel = {world: '', room: {id: '', name: '', devices: null}};
    @Output() devices: DeviceModel[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private roomService: RoomService,
                ) {
    }

    ngOnInit() {
        this.init();
    }

    add() {
       this.roomService.openCreateDialog(this.room);
    }

    delete() {
        this.roomService.openDeleteDialog(this.room);
    }

    private init() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.roomService.get(params['roomid']).subscribe((roomResponse: RoomModel | null) => {
                    if (roomResponse !== null) {
                        this.room = roomResponse;
                        this.convert(roomResponse);
                    }
                });
            }
        );
    }

    private convert(room: RoomModel) {
        this.devices = [];
        if (room.room.devices !== null) {
            Object.values(room.room.devices).forEach((resp: DeviceModel) => {
                this.devices.push(resp);
            });
        }
    }

}
