import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './world-create-room-dialog.component.html',
    styleUrls: ['./world-create-room-dialog.component.css']
})
export class WorldCreateRoomDialogComponent {

    constructor(private dialogRef: MatDialogRef<WorldCreateRoomDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string): void {
        this.dialogRef.close(name);
    }

}