import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {ChangeRoutinesModel} from './change-routines.model';
import {ChangeRoutinesMapModel} from './change-routines-map.model';
import {RoomResponseModel} from '../../room/shared/roomResponse.model';
import {RoomService} from '../../room/shared/room.service';

@Component({
    templateUrl: './change-routine-edit-dialog.component.html',
    styleUrls: ['./change-routine-edit-dialog.component.css']
})
export class ChangeRoutineEditDialogComponent implements OnInit {

    device: DeviceResponseModel | null = null;
    room: RoomResponseModel | null = null;
    changeRoutines: ChangeRoutinesModel[] = [];
    type = '';
    private Id: string;

    constructor(private dialogRef: MatDialogRef<ChangeRoutineEditDialogComponent>,
                private deviceService: DeviceService,
                private roomService: RoomService,
                @Inject(MAT_DIALOG_DATA) data: { type: string, id: string }) {
        this.Id = data.id;
        this.type = data.type;
    }

    ngOnInit() {
        this.init();
    }

    close(): void {
        this.dialogRef.close();
    }

    delete(index: number): void {
        this.changeRoutines.splice(index, 1);
    }

    edit(): void {
        const changeRoutinesMap: ChangeRoutinesMapModel = {};
        this.changeRoutines.forEach((changeRoutine: ChangeRoutinesModel) => {
            changeRoutinesMap[changeRoutine.id] = changeRoutine;
        });

        this.dialogRef.close(changeRoutinesMap);
    }

    private init() {
        switch (this.type) {
            case 'Device': {
                this.deviceService.get(this.Id).subscribe((device: DeviceResponseModel | null) => {
                    if (device !== null) {
                        this.device = device;
                        this.convertMapToArray(this.device.device.change_routines);
                    }
                });
                break;
            }
            case 'Room': {
                this.roomService.get(this.Id).subscribe((room: RoomResponseModel | null) => {
                    if (room !== null) {
                        this.room = room;
                        this.convertMapToArray(this.room.room.change_routines);
                    }
                });
                break;
            }
        }
    }

    private convertMapToArray(changeRoutines: ChangeRoutinesMapModel | null) {
        if (changeRoutines !== null) {
            Object.values(changeRoutines).forEach((changeRoutine: ChangeRoutinesModel) => {
                this.changeRoutines.push(changeRoutine);
            });
            this.sortServicesArray();
        }
    }

    private sortServicesArray() {
        this.changeRoutines.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
    }
}

