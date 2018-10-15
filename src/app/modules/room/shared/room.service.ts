import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/index';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {RoomResponseModel} from './room-response.model';
import {WorldModel} from '../../world/shared/world.model';


@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
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


}
