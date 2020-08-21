import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './device-delete-dialog.component.html',
    styleUrls: ['./device-delete-dialog.component.css']
})
export class DeviceDeleteDialogComponent {

    constructor(private dialogRef: MatDialogRef<DeviceDeleteDialogComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }

}