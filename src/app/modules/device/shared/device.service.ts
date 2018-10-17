import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {DeviceResponseModel} from './deviceResponse.model';
import {environment} from '../../../../environments/environment';
import {DeviceRequestModel} from './deviceRequest.model';
import {DeviceModel} from './device.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                ) {
    }

    create(deviceRequest: DeviceRequestModel): Observable<DeviceResponseModel | null>   {
        return this.http.post<DeviceResponseModel>(environment.mosesUrl + '/device/bydevicetype', deviceRequest).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'create', null))
        );
    }

    delete(id: string) {
        return this.http.delete(environment.mosesUrl + '/device/' + id, {responseType: 'text'}).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'delete', null))
        );
    }

    get(deviceID: string): Observable<DeviceResponseModel | null>   {
        return this.http.get<DeviceResponseModel>(environment.mosesUrl + '/device/' + deviceID).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'get', null))
        );
    }

    update(device: DeviceModel): Observable<DeviceModel | null>   {
        return this.http.put<DeviceModel>(environment.mosesUrl + '/device', device).pipe(
            catchError(this.errorHandlerService.handleError(DeviceService.name, 'update', null))
        );
    }


}
