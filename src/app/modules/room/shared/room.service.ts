import {Injectable, Output} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs/index';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {RoomModel} from './room.model';
import {WorldModel} from '../../world/shared/world.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RoomDeleteDialogComponent} from '../dialogs/room-delete-dialog.component';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';
import {RoomNewDeviceDialogComponent} from '../dialogs/room-new-device-dialog.component';
import {DeviceService} from '../../device/shared/device.service';
import {DeviceHttpModel} from '../../device/shared/deviceHttp.model';
import {DeviceModel} from '../../device/shared/device.model';
import {DeviceDeleteDialogComponent} from '../../device/dialogs/device-delete-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class RoomService {

    private devices = new Subject<DeviceModel[]>();

    @Output() currentDevices = this.devices.asObservable();

    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private sidenavService: SidenavService,
                private deviceService: DeviceService) {
    }

    get(roomId: string): Observable<RoomModel | null> {
        return this.http.get<RoomModel>(environment.mosesUrl + '/room/' + roomId).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'get', null))
        );
    }

    create(world: WorldModel, name: string): Observable<RoomModel | null> {
        return this.http.post<RoomModel>(environment.mosesUrl + '/room', {'world': world.id, 'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'create', null))
        );
    }

    openRoomDeleteDialog(room: RoomModel) {
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

    openDeviceCreateDialog(room: RoomModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomNewDeviceDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((name: string) => {
            if (name !== undefined) {
                this.deviceService.create(room, name).subscribe((device: DeviceHttpModel | null) => {
                    if (device !== null) {
                        this.refreshDevices(room);
                    }
                });
            }
        });
    }

    openDeviceDeleteDialog(room: RoomModel, deviceId: string) {
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

    refreshDevices(room: RoomModel): void {
        this.get(room.room.id).subscribe((roomResp: (RoomModel | null)) => {
            if (roomResp !== null) {
                this.devices.next(this.convertToDevicesArray(roomResp));
            }
        });
    }

    private convertToDevicesArray(room: RoomModel): DeviceModel[] {
        const devicesArray: DeviceModel[] = [];
        if (room.room.devices !== null) {
            Object.values(room.room.devices).forEach((device: DeviceModel) => {
                devicesArray.push(device);
            });
        }
        return devicesArray;
    }

    private deleteRoom(id: string) {
        return this.http.delete(environment.mosesUrl + '/room/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'delete', null))
        );
    }
}
