import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidenavSectionModel} from './sidenav-section.model';
import {WorldModel} from '../../../../modules/world/shared/world.model';
import {BehaviorSubject} from 'rxjs/index';
import {WorldService} from '../../../../modules/world/shared/world.service';

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    private sections: SidenavSectionModel[] = [];
    private sidenavSections = new BehaviorSubject(this.sections);

    @Output() currentSidenavSections = this.sidenavSections.asObservable();
    @Output() isToggled = false;
    @Output() section = '';
    @Output() toggleChanged: EventEmitter<boolean> = new EventEmitter();
    @Output() sectionChanged: EventEmitter<string> = new EventEmitter();

    constructor(private worldService: WorldService) {
    }

    toggle(sidenavOpen: boolean): void {
        this.isToggled = sidenavOpen;
        this.toggleChanged.emit(this.isToggled);
    }

    reset(): void {
        this.sectionChanged.emit(this.section);
    }

    initSidenav() {
        this.worldService.getWorlds().subscribe((worlds: WorldModel[]) => {
            this.sections.push(new SidenavSectionModel('home', 'link', 'home', '/home', 'start', []));
            worlds.forEach((world: WorldModel) => {
                this.sections.push(new SidenavSectionModel(world.name, 'link', 'public', '/world', world.id, []));
            });
            this.sidenavSections.next(this.sections);
        });
    }

    addWorldSection(world: WorldModel) {
        this.sections.push(new SidenavSectionModel(world.name, 'link', 'public', '/world', world.id, []));
        this.sidenavSections.next(this.sections);
    }


}


