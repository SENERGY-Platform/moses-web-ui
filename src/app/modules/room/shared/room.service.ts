import {Injectable, Output} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {RoomResponseModel} from './roomResponse.model';
import {WorldModel} from '../../world/shared/world.model';
import {RoomDeleteDialogComponent} from '../dialogs/room-delete-dialog.component';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';
import {RoomNewDeviceDialogComponent} from '../dialogs/room-new-device-dialog.component';
import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {DeviceDeleteDialogComponent} from '../../device/dialogs/device-delete-dialog.component';
import {DeviceRequestModel} from '../../device/shared/deviceRequest.model';
import {DeviceModel} from '../../device/shared/device.model';
import {RoomEditDeviceDialogComponent} from '../dialogs/room-edit-device-dialog.component';
import {RoomAddChangeRoutineDialogComponent} from '../dialogs/room-add-change-routine-dialog.component';
import {ChangeRequestModel} from '../../change-routines/shared/change-request.model';
import {ChangeRoutineService} from '../../change-routines/shared/change-routine.service';
import {RoomEditChangeRoutineDialogComponent} from '../dialogs/room-edit-change-routine-dialog.component';
import {RoomAddDeviceStateDialogComponent} from '../dialogs/room-add-device-state-dialog.component';
import {StatesModel} from '../../states/shared/states.model';
import {RoomEditStateDialogComponent} from '../dialogs/room-edit-state-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    private devices = new Subject<DeviceModel[]>();
    private devicesArray: DeviceModel[] = [];

    @Output() currentDevices = this.devices.asObservable();

    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private sidenavService: SidenavService,
                private deviceService: DeviceService,
                private changeRoutineService: ChangeRoutineService) {
    }

    get(roomId: string): Observable<RoomResponseModel | null> {
        return this.http.get<RoomResponseModel>(environment.mosesUrl + '/room/' + roomId).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'get', null))
        );
    }

    create(world: WorldModel, name: string): Observable<RoomResponseModel | null> {
        return this.http.post<RoomResponseModel>(environment.mosesUrl + '/room', {'world': world.id, 'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'create', null))
        );
    }

    openRoomDeleteDialog(room: RoomResponseModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomDeleteDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((roomDelete: boolean) => {
            if (roomDelete === true) {
                this.deleteRoom(room.room.id).subscribe((status: (string | null)) => {
                    if (status === 'ok') {
                        this.sidenavService.deleteRoomSection(room);
                    }
                });
            }
        });
    }

    openDeviceCreateDialog(room: RoomResponseModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = room;
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomNewDeviceDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((deviceRequest: DeviceRequestModel) => {
            if (deviceRequest !== undefined) {
                this.deviceService.create(deviceRequest).subscribe((device: DeviceResponseModel | null) => {
                    if (device !== null) {
                        this.refreshDevices(room);
                    }
                });
            }
        });
    }

    openStateCreateDialog(device: DeviceModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomAddDeviceStateDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((state: StatesModel) => {
            if (state !== undefined) {
                if (!device.states) {
                    device.states = {};
                }
                device.states[state.name] = state.value;
                this.updateDevice(device);
            }
        });
    }

    openDeviceDeleteDialog(room: RoomResponseModel, deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(DeviceDeleteDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((deviceDelete: boolean) => {
            if (deviceDelete === true) {
                this.deviceService.delete(deviceId).subscribe((status: (string | null)) => {
                    if (status === 'ok') {
                        this.refreshDevices(room);
                    }
                });
            }
        });
    }

    openDeviceEditDialog(deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = deviceId;
        const editDialogRef = this.dialog.open(RoomEditDeviceDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((device: DeviceResponseModel) => {
            if (device !== undefined) {
                this.updateDevice(device.device);
            }
        });
    }

    openStateEditDialog(deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = deviceId;
        const editDialogRef = this.dialog.open(RoomEditStateDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((device: DeviceResponseModel) => {
            if (device !== undefined) {
                this.updateDevice(device.device);
            }
        });
    }

    openCreateChangeRoutineDialog(deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomAddChangeRoutineDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((changeRequest: ChangeRequestModel) => {
            if (changeRequest !== undefined) {
                changeRequest.ref_type = 'device';
                changeRequest.ref_id = deviceId;
                this.changeRoutineService.create(changeRequest).subscribe();
            }
        });
    }

    openEditChangeRoutineDialog(deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = deviceId;
        const editDialogRef = this.dialog.open(RoomEditChangeRoutineDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((device: DeviceResponseModel) => {
            this.updateDevice(device.device);
        });
    }

    refreshDevices(room: RoomResponseModel): void {
        this.get(room.room.id).subscribe((roomResp: (RoomResponseModel | null)) => {
            if (roomResp !== null) {
                this.devices.next(this.convertToDevicesArray(roomResp));
            }
        });
    }

    private updateDevice(device: DeviceModel) {
        if (device !== undefined) {
            this.deviceService.update(device).subscribe();
        }
    }

    private convertToDevicesArray(room: RoomResponseModel): DeviceModel[] {
        this.devicesArray = [];

        if (room.room.devices !== null) {
            Object.values(room.room.devices).forEach((device: DeviceModel) => {
                this.devicesArray.push(device);
            });
        }
        this.sortDevicesArray();

        return this.devicesArray;
    }


    private sortDevicesArray() {
        this.devicesArray.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    private deleteRoom(id: string) {
        return this.http.delete(environment.mosesUrl + '/room/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'delete', null))
        );
    }
}
