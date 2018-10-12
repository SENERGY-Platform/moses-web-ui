import {SidenavPageModel} from './sidenav-page.model';

export class SidenavSectionModel {
    constructor(
        public name: string,
        public type: string,
        public icon: string,
        public state: string,
        public id: string,
        public pages: SidenavPageModel[]) {
    }
}
