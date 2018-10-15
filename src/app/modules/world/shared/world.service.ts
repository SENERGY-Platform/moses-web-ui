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

@Injectable({
    providedIn: 'root'
})

export class WorldService {
    constructor(private dialog: MatDialog,
                private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private sidenavService: SidenavService) {
    }

    add(name: string): Observable<WorldModel | null> {
        return this.http.post<WorldModel>(environment.mosesUrl + '/world', {'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'add', null))
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
                        this.sidenavService.deleteWorldSection(worldId);
                    }
                });
            }
        });
    }

    private delete(id: string) {
        return this.http.delete(environment.mosesUrl + '/world/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'delete', null))
        );
    }

}
