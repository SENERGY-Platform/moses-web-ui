import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {StatesModel} from '../../states/shared/states.model';
import {StatesMapModel} from '../../states/shared/states-map.model';


@Component({
    templateUrl: './room-edit-state-dialog.component.html',
    styleUrls: ['./room-edit-state-dialog.component.css']
})
export class RoomEditStateDialogComponent implements OnInit {

    @Output() device: DeviceResponseModel | null = null;
    @Output() states: StatesModel[] = [];
    private deviceId: string;

    constructor(private dialogRef: MatDialogRef<RoomEditStateDialogComponent>,
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
        this.states.splice(index, 1);
    }

    edit(): void {
        const statesMap: StatesMapModel = {};
        this.states.forEach((state: StatesModel) => {
            switch (state.type) {
                case 'string': {
                    statesMap[state.name] = state.value;
                    break;
                }
                case 'number': {
                    statesMap[state.name] = parseFloat(<string>state.value);
                    break;
                }
                case 'boolean': {
                    if (state.value === 'true') {
                        statesMap[state.name] = true;
                    }
                    if (state.value === 'false') {
                        statesMap[state.name] = false;
                    }
                    break;
                }
            }
        });
        if (this.device) {
            this.device.device.states = statesMap;
        }
        this.dialogRef.close(this.device);
    }

    private initDevice() {
        this.deviceService.get(this.deviceId).subscribe((device: DeviceResponseModel | null) => {
            if (device !== null) {
                this.device = device;
                if (this.device.device.states !== null) {
                    Object.entries(device.device.states).forEach((states) => {
                        this.states.push({name: states[0], value: states[1], type: typeof states[1]});
                    });
               this.sortServicesArray();
                }
            }
        });
    }

    private sortServicesArray() {
        this.states.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }
}
