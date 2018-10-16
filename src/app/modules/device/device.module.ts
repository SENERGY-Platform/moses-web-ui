import {NgModule} from '@angular/core';
import {DeviceDeleteDialogComponent} from './dialogs/device-delete-dialog.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
    imports: [
        MatDialogModule,
    ],
    declarations: [
        DeviceDeleteDialogComponent,
    ],
    entryComponents: [DeviceDeleteDialogComponent],
})
export class DeviceModule {
}
