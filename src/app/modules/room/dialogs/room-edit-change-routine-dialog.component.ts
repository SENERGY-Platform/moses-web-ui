import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {ChangeRoutinesModel} from '../../change-routines/shared/change-routines.model';
import {ChangeRoutinesMapModel} from '../../change-routines/shared/change-routines-map.model';

@Component({
    templateUrl: './room-edit-change-routine-dialog.component.html',
    styleUrls: ['./room-edit-change-routine-dialog.component.css']
})
export class RoomEditChangeRoutineDialogComponent implements OnInit {

    @Output() device: DeviceResponseModel | null = null;
    @Output() changeRoutines: ChangeRoutinesModel[] = [];
    private deviceId: string;

    constructor(private dialogRef: MatDialogRef<RoomEditChangeRoutineDialogComponent>,
                private deviceService: DeviceService,
                @Inject(MAT_DIALOG_DATA) deviceId: string) {
        this.deviceId = deviceId;
    }

    ngOnInit() {
        this.initDevice();
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
        if (this.device) {
            this.device.device.change_routines = changeRoutinesMap;
        }
        this.dialogRef.close(this.device);
    }

    private initDevice() {
        this.deviceService.get(this.deviceId).subscribe((device: DeviceResponseModel | null) => {
            if (device !== null) {
                this.device = device;
                if (this.device.device.change_routines !== null) {
                    Object.values(device.device.change_routines).forEach((changeRoutines: ChangeRoutinesModel) => {
                        this.changeRoutines.push(changeRoutines);
                    });
                    this.sortServicesArray();
                }
            }
        });
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

