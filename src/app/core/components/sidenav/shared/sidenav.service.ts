import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidenavSectionModel} from './sidenav-section.model';
import {WorldModel} from '../../../../modules/world/shared/world.model';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';
import {environment} from '../../../../../environments/environment';
import {ErrorHandlerService} from '../../../services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RoomModel} from '../../../../modules/room/shared/room.model';
import {SidenavPageModel} from './sidenav-page.model';

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

    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService,
                private router: Router,
               ) {
    }

    toggle(sidenavOpen: boolean): void {
        this.isToggled = sidenavOpen;
        this.toggleChanged.emit(this.isToggled);
    }

    reset(): void {
        this.sectionChanged.emit(this.section);
    }

    initSidenav() {
        this.getWorlds().subscribe((worlds: WorldModel[]) => {
            this.sections.push(new SidenavSectionModel('home', 'link', 'home', '/home', 'start', []));
            worlds.forEach((world: WorldModel) => {
                const pages: SidenavPageModel[] = [];
                if (world.rooms !== null) {
                    Object.values(world.rooms).forEach((room: RoomModel) => {
                        pages.push(new SidenavPageModel(room.name, 'link', 'meeting_room', '/room'));
                    } );
                }
                this.sections.push(new SidenavSectionModel(world.name, 'toggle', 'public', '/world', world.id, pages));
            });
            this.sidenavSections.next(this.sections);
        });
    }

    addWorldSection(world: WorldModel) {
        this.sections.push(new SidenavSectionModel(world.name, 'toggle', 'public', '/world', world.id, []));
        this.sidenavSections.next(this.sections);
    }

    deleteWorldSection(world: WorldModel) {
        let deleteIndex = 0;
        this.sections.forEach((section: SidenavSectionModel, index: number) => {
            if (section.id === world.id) {
                deleteIndex = index;
            }
        });

        if (deleteIndex > 0) {
            this.sections.splice(deleteIndex, 1);
            this.sidenavSections.next(this.sections);
            this.router.navigate(['/home/start']);
        }

    }

    private getWorlds(): Observable<WorldModel[]> {
        return this.http.get<WorldModel[]>(environment.mosesUrl + '/worlds').pipe(
            map(resp => resp || []),
            catchError(this.errorHandlerService.handleError(SidenavService.name, 'getWorlds', []))
        );
    }

}


