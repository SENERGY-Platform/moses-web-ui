import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {ChangeRequestModel} from './change-request.model';
import {environment} from '../../../../environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ChangeRoutineEditDialogComponent} from '../dialog/change-routine-edit-dialog.component';
import {ChangeRoutinesMapModel} from './change-routines-map.model';
import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {RoomService} from '../../room/shared/room.service';
import {RoomResponseModel} from '../../room/shared/roomResponse.model';
import {ChangeRoutineAddDialogComponent} from '../dialog/change-routine-add-dialog.component';
import {WorldService} from '../../world/shared/world.service';
import {WorldModel} from '../../world/shared/world.model';


@Injectable({
    providedIn: 'root'
})
export class ChangeRoutineService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private dialog: MatDialog,
                private deviceService: DeviceService,
                private roomService: RoomService,
                private worldService: WorldService,
    ) {
    }

    create(changeRequest: ChangeRequestModel): Observable<ChangeRequestModel | null> {
        return this.http.post<ChangeRequestModel>(environment.mosesUrl + '/changeroutine', changeRequest).pipe(
            catchError(this.errorHandlerService.handleError(ChangeRoutineService.name, 'create', null))
        );
    }

    openEditChangeRoutineDialog(type: string, id: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {type: type, id: id};
        const editDialogRef = this.dialog.open(ChangeRoutineEditDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((changeRoutines: ChangeRoutinesMapModel) => {
            if (changeRoutines !== undefined) {
                switch (type) {
                    case 'device': {
                        this.deviceService.get(id).subscribe((device: DeviceResponseModel | null) => {
                            if (device) {
                                device.device.change_routines = changeRoutines;
                                this.deviceService.update(device.device).subscribe();
                            }
                        });
                        break;
                    }
                    case 'room': {
                        this.roomService.get(id).subscribe((room: RoomResponseModel | null) => {
                            if (room) {
                                room.room.change_routines = changeRoutines;
                                this.roomService.update(room.room).subscribe();
                            }
                        });
                        break;
                    }
                    case 'world': {
                        this.worldService.get(id).subscribe((world: WorldModel | null) => {
                            if (world) {
                                world.change_routines = changeRoutines;
                                this.worldService.update(world).subscribe();
                            }
                        });
                        break;
                    }
                }
            }
        });
    }

    openCreateChangeRoutineDialog(type: string, deviceId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(ChangeRoutineAddDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((changeRequest: ChangeRequestModel) => {
            if (changeRequest !== undefined) {
                changeRequest.ref_type = type;
                changeRequest.ref_id = deviceId;
                this.create(changeRequest).subscribe();
            }
        });
    }
}
