import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {HomeNewWorldDialogComponent} from '../dialogs/home-new-world-dialog.component';
import {WorldService} from '../../world/shared/world.service';
import {WorldModel} from '../../world/shared/world.model';
import {SidenavService} from '../../../core/components/sidenav/shared/sidenav.service';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private dialog: MatDialog, private worldService: WorldService, private sidenavService: SidenavService) {
    }

    openNewWorldDialog() {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        const editDialogRef = this.dialog.open(HomeNewWorldDialogComponent, dialogConfig);

        editDialogRef.afterClosed().subscribe((name: string) => {
            if (name !== undefined) {
                this.worldService.create(name).subscribe((world: WorldModel | null) => {
                        if (world !== null) {
                            this.sidenavService.addWorldSection();
                        }
                    }
                );
            }
        });
    }


}
