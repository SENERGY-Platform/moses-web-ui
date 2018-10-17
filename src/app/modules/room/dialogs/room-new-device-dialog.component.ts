import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import {DeviceTypesService} from '../../device-types/shared/device-types.service';
import {DeviceTypeModel} from '../../device-types/shared/device-type.model';
import {RoomResponseModel} from '../shared/roomResponse.model';
import {DeviceRequestModel} from '../../device/shared/deviceRequest.model';

@Component({
    templateUrl: './room-new-device-dialog.component.html',
    styleUrls: ['./room-new-device-dialog.component.css']
})
export class RoomNewDeviceDialogComponent implements OnInit {

    @Output() deviceTypes: DeviceTypeModel[] = [];
    @Output() selected = new FormControl('', [
        Validators.required,
    ]);
    @Output() room: RoomResponseModel;

    constructor(private dialogRef: MatDialogRef<RoomNewDeviceDialogComponent>,
                private deviceTypesService: DeviceTypesService,
                @Inject(MAT_DIALOG_DATA) room: RoomResponseModel) {
        this.room = room;
    }

    ngOnInit() {
        this.get();
    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string, deviceTypeId: string): void {
        const deviceRequest: DeviceRequestModel = {device_type_id: deviceTypeId, name: name, room: this.room.room.id};
        console.log(this.room);
        console.log(deviceRequest);
        this.dialogRef.close(deviceRequest);
    }

    private get() {
        this.deviceTypesService.getMosesTypes().subscribe((deviceTypeArray: string[]) => {
            this.deviceTypesService.getDeviceTypesMetadata(deviceTypeArray).subscribe((deviceTypes: DeviceTypeModel[]) => {
                this.deviceTypes = deviceTypes;
            });
        });
    }
}

