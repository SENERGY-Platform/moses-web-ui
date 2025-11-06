import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {environment} from '../../../../environments/environment';
import {WorldModel} from '../../world/shared/world.model';


@Injectable({
    providedIn: 'root'
})

export class ServicesService {
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                ) {
    }

    runService(serviceID: string): Observable<WorldModel | null> {
        return this.http.post<WorldModel>(environment.mosesUrl + '/run/service/' + serviceID, {}).pipe(
            catchError(this.errorHandlerService.handleError(ServicesService.name, 'runService', null))
        );
    }
}
