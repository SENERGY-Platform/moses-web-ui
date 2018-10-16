import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/index';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {RoomModel} from './room.model';
import {WorldModel} from '../../world/shared/world.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RoomDeleteDialogComponent} from '../dialogs/room-delete-dialog.component';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';
import {RoomNewDeviceDialogComponent} from '../dialogs/room-new-device-dialog.component';
import {DeviceService} from '../../device/shared/device.service';
import {DeviceModel} from '../../device/shared/device.model';


@Injectable({
    providedIn: 'root'
})
export class RoomService {

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

    openDeleteDialog(room: RoomModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomDeleteDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((roomDelete: boolean) => {
            if (roomDelete === true) {
                this.delete(room.room.id).subscribe((status: (string | null)) => {
                    if (status === 'ok') {
                        this.sidenavService.deleteRoomSection(room);
                    }
                });
            }
        });
    }

    openCreateDialog(room: RoomModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(RoomNewDeviceDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((name: string) => {
            if (name !== undefined) {
                this.deviceService.create(room, name).subscribe((device: DeviceModel | null) => {
                        if (device !== null) {
                            console.log(device);
                        }
                    }
                );
            }
        });
    }

    private delete(id: string) {
        return this.http.delete(environment.mosesUrl + '/room/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'delete', null))
        );
    }

}
