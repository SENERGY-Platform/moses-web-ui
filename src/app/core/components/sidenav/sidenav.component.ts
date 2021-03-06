import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap, take} from 'rxjs/internal/operators';

import {ResponsiveService} from '../../services/responsive.service';
import {SidenavService} from './shared/sidenav.service';
import {SidenavSectionModel} from './shared/sidenav-section.model';

@Component({
    selector: 'moses-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit, AfterViewInit {

    @ViewChild('sidenav') sidenav!: MatSidenav;
    @Output() mode = '';
    @Output() sections: SidenavSectionModel[] = [];
    @Output() openSection: null | string = null;
    @Output() zIndex = -1;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private sidenavService: SidenavService,
                private responsiveService: ResponsiveService) {
    }

    ngOnInit() {
        this.getSections();
        this.showOrHideSidenav();
    }

    ngAfterViewInit() {
        this.sidenavChangeListener();
    }

    isSectionOpen(section: SidenavSectionModel): boolean {
        if (this.openSection === null) {
            return false;
        } else {
            return this.openSection === section.state + '/' + section.id;
        }
    }

    toggleSection(section: SidenavSectionModel): void {
        const urlSuffix = section.state + '/' + section.id;
        this.openSection = (this.openSection === urlSuffix ? null : urlSuffix);
        if (section.type === 'link') {
            this.closeSidenav();
        }
    }

    closeSidenav(): void {
        if (this.sidenav.mode === 'over') {
            this.sidenavService.toggle(false);
        }
    }

    private sidenavChangeListener(): void {
        this.sidenavService.toggleChanged.subscribe((isToggle: boolean) => {
            if (isToggle) {
                this.zIndex = 0;
            } else {
                this.zIndex = -1;
            }
            this.sidenav.toggle(isToggle);
        });
        this.sidenavService.sectionChanged.subscribe((section: SidenavSectionModel) => {
            this.openSection = section.state + '/' + section.id;
        });
    }

    private showOrHideSidenav(): void {
        this.responsiveService.observeMqAlias().subscribe((mqAlias) => {
            if (mqAlias === 'sm' || mqAlias === 'xs') {
                this.sidenav.close();
                this.sidenav.mode = 'over';
                this.sidenav.disableClose = false;
                this.sidenav.fixedTopGap = 0;
                this.zIndex = -1;
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
                this.sidenav.disableClose = true;
                this.sidenav.fixedTopGap = 64;
                this.zIndex = -1;
            }
        });
    }

    private getSections(): void {
        this.sidenavService.currentSidenavSections.subscribe(sections => {
                this.sections = sections;
            }
        );
        this.sidenavService.initSidenav();
        this.getActiveSection();
    }

    private getActiveSection() {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            take(1),
            map(() => {
                return this.activatedRoute.firstChild;
            }),
            mergeMap((activatedRoute: any) =>  activatedRoute.url)
        ).subscribe((activeRoute: any) => {
                this.openSection = '/' + activeRoute[0].path + '/' + activeRoute[1].path;
            });
    }
}
