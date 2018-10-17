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
                    Object.values(world.rooms).forEach((room) => {
                        pages.push(new SidenavPageModel(room.name, 'link', 'meeting_room', '/world/' + world.id + '/room/' + room.id, room.id));
                    });
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

    addRoomSection(world: WorldModel, room: RoomResponseModel) {
        this.sections.forEach((section: SidenavSectionModel) => {
            if (section.id === world.id) {
                section.pages.push(new SidenavPageModel(room.room.name, 'link', 'meeting_room',
                    '/world/' + world.id + '/room/' + room.room.id, room.room.id));
                this.sidenavSections.next(this.sections);
            }
        });
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

    deleteRoomSection(room: RoomResponseModel) {
        let sidenavIndex = 0;
        this.sections.forEach((section: SidenavSectionModel, index: number) => {
            if (section.id === room.world) {
                sidenavIndex = index;
            }
        });

        if (sidenavIndex > 0) {
            let deletePageIndex = -1;
            this.sections[sidenavIndex].pages.forEach((page: SidenavPageModel, index: number) => {
                if (page.id = room.room.id) {
                    deletePageIndex = index;
                }
            });

            if (deletePageIndex >= 0) {
                this.sections[sidenavIndex].pages.splice(deletePageIndex, 1);
                this.sidenavSections.next(this.sections);
                this.router.navigate([this.sections[sidenavIndex].state, this.sections[sidenavIndex].id]);
            }
        }
    }

    private getWorlds(): Observable<WorldModel[]> {
        return this.http.get<WorldModel[]>(environment.mosesUrl + '/worlds').pipe(
            map(resp => resp || []),
            catchError(this.errorHandlerService.handleError(SidenavService.name, 'getWorlds', []))
        );
    }

}


