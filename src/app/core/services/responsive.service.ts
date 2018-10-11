import {Injectable} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs';

const mqAliases: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];

@Injectable({
    providedIn: 'root'
})

export class ResponsiveService {

    constructor(private observableMedia: ObservableMedia) {
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
            this.observableMedia.subscribe((media: MediaChange) => {
                observer.next(media.mqAlias);
            });
        });
    }

}
