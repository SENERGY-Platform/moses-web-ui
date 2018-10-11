import {EventEmitter, Injectable, Output} from '@angular/core';

import {SidenavSectionModel} from './sidenav-section.model';

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    @Output() isToggled = false;
    @Output() section = '';

    @Output() toggleChanged: EventEmitter<boolean> = new EventEmitter();
    @Output() sectionChanged: EventEmitter<string> = new EventEmitter();

    toggle(sidenavOpen: boolean): void {
        this.isToggled = sidenavOpen;
        this.toggleChanged.emit(this.isToggled);
    }

    reset(): void {
       this.sectionChanged.emit(this.section);
    }

    getSections(): SidenavSectionModel[] {
        const sections: SidenavSectionModel[] = [];


        sections.push(new SidenavSectionModel('Home', 'link', 'home', '/home', []));

        return sections;
    }

    constructor() { }
}


