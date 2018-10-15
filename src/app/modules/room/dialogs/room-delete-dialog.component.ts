import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    templateUrl: './room-delete-dialog.component.html',
    styleUrls: ['./room-delete-dialog.component.css']
})
export class RoomDeleteDialogComponent {

    constructor(private dialogRef: MatDialogRef<RoomDeleteDialogComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }

}