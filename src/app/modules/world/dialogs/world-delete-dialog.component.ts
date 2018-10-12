import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    templateUrl: './world-delete-dialog.component.html',
    styleUrls: ['./world-delete-dialog.component.css']
})
export class WorldDeleteDialogComponent {

    constructor(private dialogRef: MatDialogRef<WorldDeleteDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string): void {
        this.dialogRef.close(name);
    }

}