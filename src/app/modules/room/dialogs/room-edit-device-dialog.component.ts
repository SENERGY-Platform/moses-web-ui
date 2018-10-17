import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {DeviceService} from '../../device/shared/device.service';
import {ServicesModel} from '../../services/shared/services.model';
import {ServicesMapModel} from '../../services/shared/services-map.model';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';

@Component({
    templateUrl: './room-edit-device-dialog.component.html',
    styleUrls: ['./room-edit-device-dialog.component.css']
})
export class RoomEditDeviceDialogComponent implements OnInit {

    @Output() device: DeviceResponseModel | null = null;
    @Output() services: ServicesModel[] = [];
    private deviceId: string;

    constructor(private dialogRef: MatDialogRef<RoomEditDeviceDialogComponent>,
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

    edit(): void {
        const servicesMap: ServicesMapModel = {};
        this.services.forEach((service: ServicesModel) => {
            servicesMap[service.id] = service;
        });
        if (this.device) {
            this.device.device.services = servicesMap;
        }
        this.dialogRef.close(this.device);
    }

    private initDevice() {
        this.deviceService.get(this.deviceId).subscribe((device: DeviceResponseModel | null) => {
            if (device !== null) {
              this.device = device;

                Object.values(device.device.services).forEach((service: ServicesModel) => {
                    this.services.push(service);
                });
                this.sortServicesArray();
            }
        });
    }

    private sortServicesArray() {
        this.services.sort((a, b) => {
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

