import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ChangeRequestModel} from '../../change-routines/shared/change-request.model';

@Component({
    templateUrl: './room-add-change-routine-dialog.component.html',
    styleUrls: ['./room-add-change-routine-dialog.component.css']
})
export class RoomAddChangeRoutineDialogComponent {

    @Output() changeRoutine: ChangeRequestModel = {ref_id: '', code: '', interval: 0, ref_type: ''};

    constructor(private dialogRef: MatDialogRef<RoomAddChangeRoutineDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        this.dialogRef.close(this.changeRoutine);
    }

}