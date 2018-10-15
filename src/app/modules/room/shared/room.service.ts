import {Injectable} from '@angular/core';
import {WorldModel} from '../../world/shared/world.model';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/index';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
    }

    create(world: WorldModel, name: string): Observable<WorldModel | null> {
        return this.http.post<WorldModel>(environment.mosesUrl + '/room', {'world': world.id, 'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(RoomService.name, 'create', null))
        );
    }


}
