import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../../../environments/environment';
import {RoomResponseModel} from '../../room/shared/room-response.model';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {DeviceModel} from './device.model';
import {Observable} from 'rxjs/index';


@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                ) {
    }

    create(room: RoomResponseModel, name: string): Observable<DeviceModel | null>   {
        return this.http.post<DeviceModel>(environment.mosesUrl + '/device', {
            'room': room.room.id,
            'name': name
        }).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'create', null))
        );
    }

}
