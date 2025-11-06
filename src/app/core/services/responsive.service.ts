import {Injectable} from '@angular/core';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import {Observable} from 'rxjs';

const mqAliases: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];

@Injectable({
    providedIn: 'root'
})

export class ResponsiveService {

    constructor(private observableMedia: MediaObserver) {
    }

    getActiveMqAlias(): string {
        let mqAlias = '';
        for (let i = 0; i < mqAliases.length; i++) {
            if (this.observableMedia.isActive(mqAliases[i])) {
                mqAlias = mqAliases[i];
                break;
            }
        }
        return mqAlias;
    }

    observeMqAlias(): Observable<string> {
        return new Observable<string>((observer) => {
            this.observableMedia.asObservable().subscribe((media: MediaChange[]) => {
                observer.next(media[0].mqAlias);
            });
        });
    }

}
