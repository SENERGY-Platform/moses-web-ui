import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {environment} from '../../../../environments/environment';
import {WorldModel} from './world.model';
import {WorldDeleteDialogComponent} from '../dialogs/world-delete-dialog.component';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';
import {WorldCreateRoomDialogComponent} from '../dialogs/world-create-room-dialog.component';
import {RoomService} from '../../room/shared/room.service';
import {RoomResponseModel} from '../../room/shared/roomResponse.model';

@Injectable({
    providedIn: 'root'
})

export class WorldService {
    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private sidenavService: SidenavService,
                private roomService: RoomService) {
    }

    create(name: string): Observable<WorldModel | null> {
        return this.http.post<WorldModel>(environment.mosesUrl + '/world', {'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'create', null))
        );
    }

    get(worldId: string): Observable<WorldModel | null> {
        return this.http.get<WorldModel>(environment.mosesUrl + '/world/' + worldId).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'get', null))
        );
    }

    update(world: WorldModel) {
        return this.http.put(environment.mosesUrl + '/world', world).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'update', null))
        );
    }

    openDeleteDialog(worldId: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(WorldDeleteDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((deleteWorld: boolean) => {
            if (deleteWorld === true) {
                this.delete(worldId).subscribe((status: (string | null)) => {
                    if (status === 'ok') {
                        this.sidenavService.deleteWorldSection();
                    }
                });
            }
        });
    }

    openCreateRoomDialog(world: WorldModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(WorldCreateRoomDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((roomName: string) => {
            if (roomName !== undefined) {
                this.roomService.create(world, roomName).subscribe((room: RoomResponseModel | null) => {
                        if (room !== null) {
                            this.sidenavService.addRoomSection();
                        }
                    }
                );
            }
        });
    }

    private delete(id: string) {
        return this.http.delete(environment.mosesUrl + '/world/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'delete', null))
        );
    }

}
