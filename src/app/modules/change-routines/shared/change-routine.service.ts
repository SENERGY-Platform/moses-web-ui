import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {ChangeRequestModel} from './change-request.model';
import {environment} from '../../../../environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ChangeRoutineEditDialogComponent} from './change-routine-edit-dialog.component';
import {ChangeRoutinesMapModel} from './change-routines-map.model';
import {DeviceService} from '../../device/shared/device.service';
import {DeviceResponseModel} from '../../device/shared/deviceResponse.model';
import {RoomService} from '../../room/shared/room.service';
import {RoomResponseModel} from '../../room/shared/roomResponse.model';



@Injectable({
    providedIn: 'root'
})
export class ChangeRoutineService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private dialog: MatDialog,
                private deviceService: DeviceService,
                private roomService: RoomService,
                ) {
    }

    create(changeRequest: ChangeRequestModel): Observable<ChangeRequestModel | null>   {
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
                    case 'Device': {
                        this.deviceService.get(id).subscribe((device: DeviceResponseModel | null) => {
                            if (device) {
                                device.device.change_routines = changeRoutines;
                                this.deviceService.update(device.device).subscribe();
                            }
                        });
                        break;
                    }
                    case 'Room': {
                        this.roomService.get(id).subscribe((room: RoomResponseModel | null) => {
                            if (room) {
                                room.room.change_routines = changeRoutines;
                                this.roomService.update(room.room).subscribe();
                            }
                        });
                        break;
                    }
                }
            }
        });
    }
}
