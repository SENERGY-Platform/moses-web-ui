import {NgModule} from '@angular/core';
import {DeviceDeleteDialogComponent} from './dialogs/device-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatDialogModule,
    ],
    declarations: [
        DeviceDeleteDialogComponent,
    ],
})
export class DeviceModule {
}
