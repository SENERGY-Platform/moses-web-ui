import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {RoomModel} from '../../room/shared/room.model';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {DeviceHttpModel} from './deviceHttp.model';
import {Observable} from 'rxjs/index';


@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                ) {
    }

    create(room: RoomModel, name: string): Observable<DeviceHttpModel | null>   {
        return this.http.post<DeviceHttpModel>(environment.mosesUrl + '/device', {
            'room': room.room.id,
            'name': name
        }).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'create', null))
        );
    }

}
