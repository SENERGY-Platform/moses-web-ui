import {EventEmitter, Injectable, Output} from '@angular/core';
import {SidenavSectionModel} from './sidenav-section.model';
import {WorldModel} from '../../../../modules/world/shared/world.model';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';
import {environment} from '../../../../../environments/environment';
import {ErrorHandlerService} from '../../../services/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SidenavPageModel} from './sidenav-page.model';
import {RoomResponseModel} from '../../../../modules/room/shared/roomResponse.model';

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    private sections: SidenavSectionModel[] = [];
    private pages: SidenavPageModel[] = [];
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
            this.sections = [];
            worlds.forEach((world: WorldModel) => {
                this.pages = [];
                if (world.rooms !== null) {
                    Object.values(world.rooms).forEach((room) => {
                        this.pages.push(new SidenavPageModel(room.name, 'link', 'meeting_room', '/world/' + world.id + '/room/' + room.id, room.id));
                    });
                }
                this.sortPagesArray();
                this.sections.push(new SidenavSectionModel(world.name, 'toggle', 'public', '/world', world.id, this.pages));
            });

            this.sortSectionArray();
            this.sections.splice(0, 0, new SidenavSectionModel('HOME', 'link', 'home', '/home', 'start', []));

            this.sidenavSections.next(this.sections);

        });
    }

    private sortSectionArray() {
        this.sections.sort((a, b) => {

            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;

        });
    }

    private sortPagesArray() {
        this.pages.sort((a, b) => {

            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;

        });
    }

    addWorldSection() {
        this.initSidenav();
    }

    addRoomSection() {
        this.initSidenav();
    }

    deleteWorldSection() {
        this.initSidenav();
        this.router.navigate(['/home/start']);
    }

    deleteRoomSection(room: RoomResponseModel) {
        this.initSidenav();
        this.router.navigate(['/world', room.world]);
    }

    private getWorlds(): Observable<WorldModel[]> {
        return this.http.get<WorldModel[]>(environment.mosesUrl + '/worlds').pipe(
            map(resp => resp || []),
            catchError(this.errorHandlerService.handleError(SidenavService.name, 'getWorlds', []))
        );
    }

}


