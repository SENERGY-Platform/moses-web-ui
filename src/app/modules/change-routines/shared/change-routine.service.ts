import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {ChangeRequestModel} from './change-request.model';
import {environment} from '../../../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ChangeRoutineService {

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                ) {
    }

    create(changeRequest: ChangeRequestModel): Observable<ChangeRequestModel | null>   {
        return this.http.post<ChangeRequestModel>(environment.mosesUrl + '/changeroutine', changeRequest).pipe(
            catchError(this.errorHandlerService.handleError(ChangeRoutineService.name, 'create', null))
        );
    }
}
