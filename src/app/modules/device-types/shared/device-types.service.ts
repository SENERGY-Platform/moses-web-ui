import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {environment} from '../../../../environments/environment';
import {DeviceTypeModel} from './device-type.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceTypesService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
    ) {
    }

    getMosesTypes(): Observable<string[]> {
        return this.http.get<string[]>(environment.mosesUrl + '/devicetypes').pipe(
            catchError(this.errorHandlerService.handleError(DeviceTypesService.name, 'getMosesTypes', []))
        );
    }

    getDeviceTypesMetadata(idArray: string[]): Observable<DeviceTypeModel[]> {
        return this.http.get<DeviceTypeModel[]>(environment.permissionSearchUrl + '/v3/device-types?ids=' + idArray.join(',')).pipe(
            map((resp: any) => resp || []),
            catchError(this.errorHandlerService.handleError(DeviceTypesService.name, 'getDeviceTypesMetadata', []))
        );
    }

}
