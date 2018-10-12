import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class WorldService {
    constructor() {
    }

    getWorlds() {
        console.log('getWorlds');
    }

    addWorld() {
        console.log('addWorld');
    }
}
