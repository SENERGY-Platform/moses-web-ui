import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/index';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {RoomResponseModel} from './room-response.model';
import {WorldModel} from '../../world/shared/world.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RoomDeleteDialogComponent} from '../dialogs/room-delete-dialog.component';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';


@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private sidenavService: SidenavService) {
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

    openDeleteDialog(room: RoomResponseModel) {
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

    private delete(id: string) {
        return this.http.delete(environment.mosesUrl + '/room/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'delete', null))
        );
    }

}
