import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    templateUrl: './room-new-device-dialog.component.html',
    styleUrls: ['./room-new-device-dialog.component.css']
})
export class RoomNewDeviceDialogComponent {

    constructor(private dialogRef: MatDialogRef<RoomNewDeviceDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string): void {
        this.dialogRef.close(name);
    }

}