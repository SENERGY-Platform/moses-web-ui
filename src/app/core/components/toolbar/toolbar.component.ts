import {Component, OnInit, Output} from '@angular/core';

@Component({
    selector: 'moses-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    @Output() header = '';

    constructor() {
    }

    ngOnInit() {
       // this.setHeader();
    }

    toggle(sidenavOpen: boolean): void {
      //  this.sidenavService.toggle(sidenavOpen);
    }

    resetSidenav(): void {
       // this.sidenavService.reset();
    }

    /*private setHeader() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute.firstChild;
                let child = route;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                        route = child;
                    } else {
                        child = null;
                    }
                }
                return route;
            }),
            mergeMap((route: ActivatedRoute) => route.data)
        ).subscribe((data: any) => {
            this.header = data.header;
        });
    }*/

}
