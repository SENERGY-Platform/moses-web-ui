import {Component, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import {DeviceTypesService} from '../../device-types/shared/device-types.service';
import {DeviceTypeModel} from '../../device-types/shared/device-type.model';

@Component({
    templateUrl: './room-new-device-dialog.component.html',
    styleUrls: ['./room-new-device-dialog.component.css']
})
export class RoomNewDeviceDialogComponent implements OnInit {

    @Output() deviceTypes: DeviceTypeModel[] = [];
    @Output() selected = new FormControl('', [
        Validators.required,
    ]);

    constructor(private dialogRef: MatDialogRef<RoomNewDeviceDialogComponent>,
                private deviceTypesService: DeviceTypesService) {
    }

    ngOnInit() {
        this.get();
    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string): void {
        this.dialogRef.close(name);
    }

    private get() {
        this.deviceTypesService.getMosesTypes().subscribe((deviceTypeArray: string[]) => {
            this.deviceTypesService.getDeviceTypesMetadata(deviceTypeArray).subscribe((deviceTypes: DeviceTypeModel[]) => {
                this.deviceTypes = deviceTypes;
            });
        });
    }
}

