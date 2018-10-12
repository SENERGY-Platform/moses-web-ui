import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor() {
    }

    handleError<T>(service: string, method: string, result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error('Error =>> Service: ' + service + ' =>> Method: ' + method);
            console.error(error);
            return of(result as T);
        };
    }
}
