import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
    selector: 'moses-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    userName = '';

    constructor(private authorizationService: AuthorizationService) {
    }

    ngOnInit() {
        this.initUser();
    }

    toggle(sidenavOpen: boolean): void {
      //  this.sidenavService.toggle(sidenavOpen);
    }

    resetSidenav(): void {
       // this.sidenavService.reset();
    }

    logout(): void {
        this.authorizationService.logout();
    }

    private initUser() {
        this.userName = this.authorizationService.getUserName();
    }
}
