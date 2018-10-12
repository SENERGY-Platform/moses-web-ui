import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../../../core/services/error-handler.service';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {WorldModel} from './world.model';

@Injectable({
    providedIn: 'root'
})

export class WorldService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    getWorlds(): Observable<WorldModel[]> {
       return this.http.get<WorldModel[]>(environment.mosesUrl + '/worlds').pipe(
            map(resp => resp || []),
            catchError(this.errorHandlerService.handleError(WorldService.name, 'getWorlds', []))
        );
        console.log('getWorlds');
    }

    addWorld(name: string): Observable<WorldModel | null> {
       return this.http.post<WorldModel>(environment.mosesUrl + '/world', {'name': name}).pipe(
            catchError(this.errorHandlerService.handleError(WorldService.name, 'addWorld', null))
        );
    }
}
