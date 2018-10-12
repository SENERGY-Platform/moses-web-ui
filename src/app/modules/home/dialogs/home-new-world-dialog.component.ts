import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    templateUrl: './home-new-world-dialog.component.html',
    styleUrls: ['./home-new-world-dialog.component.css']
})
export class HomeNewWorldDialogComponent {

    constructor(private dialogRef: MatDialogRef<HomeNewWorldDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(name: string): void {
        this.dialogRef.close(name);
    }

}